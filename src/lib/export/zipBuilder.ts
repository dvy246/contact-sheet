/**
 * A lightweight, zero-dependency, pure-TS ZIP archive builder.
 * Follows standard PKZip format for uncompressed (STORE) files.
 */
export class ZipBuilder {
  private files: { name: string; data: Uint8Array }[] = [];

  /**
   * Adds a file to the ZIP archive.
   * @param filename Path/Name of the file
   * @param content File contents as a string (UTF-8) or Uint8Array
   */
  addFile(filename: string, content: string | Uint8Array) {
    // Security: sanitize filename against Zip Slip / path traversal
    const safeName = filename
      .replace(/^(\.\.[\/\\])+/, '')
      .replace(/[\/\\]+/g, '_')
      .replace(/[<>:"|?*\x00-\x1F]/g, '_')
      .trim() || 'file';

    let data: Uint8Array;
    if (typeof content === 'string') {
      data = new TextEncoder().encode(content);
    } else {
      data = content;
    }
    this.files.push({ name: safeName, data });
  }

  /**
   * Computes a standard IEEE 802.3 CRC-32 checksum.
   */
  private crc32(data: Uint8Array): number {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      crc ^= data[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
  }

  /**
   * Builds a downloadable ZIP Blob.
   */
  buildZipBlob(): Blob {
    const localFileHeaders: Uint8Array[] = [];
    const centralDirectoryHeaders: Uint8Array[] = [];
    let offset = 0;

    for (const file of this.files) {
      const nameBytes = new TextEncoder().encode(file.name);
      const data = file.data;
      const crc = this.crc32(data);
      const size = data.length;

      // 1. Local File Header
      const lfh = new Uint8Array(30 + nameBytes.length);
      const lfhView = new DataView(lfh.buffer);
      lfhView.setUint32(0, 0x04034b50, true); // Signature
      lfhView.setUint16(4, 20, true); // Version needed to extract
      lfhView.setUint16(6, 0, true); // General purpose bit flag
      lfhView.setUint16(8, 0, true); // Compression method (0 = STORE)
      lfhView.setUint16(10, 0, true); // Last mod file time
      lfhView.setUint16(12, 0, true); // Last mod file date
      lfhView.setUint32(14, crc, true); // CRC-32
      lfhView.setUint32(18, size, true); // Compressed size
      lfhView.setUint32(22, size, true); // Uncompressed size
      lfhView.setUint16(26, nameBytes.length, true); // File name length
      lfhView.setUint16(28, 0, true); // Extra field length
      lfh.set(nameBytes, 30);
      localFileHeaders.push(lfh);
      localFileHeaders.push(data);

      // 2. Central Directory Header
      const cdh = new Uint8Array(46 + nameBytes.length);
      const cdhView = new DataView(cdh.buffer);
      cdhView.setUint32(0, 0x02014b50, true); // Signature
      cdhView.setUint16(4, 20, true); // Version made by
      cdhView.setUint16(6, 20, true); // Version needed to extract
      cdhView.setUint16(8, 0, true); // General purpose bit flag
      cdhView.setUint16(10, 0, true); // Compression method
      cdhView.setUint16(12, 0, true); // Last mod file time
      cdhView.setUint16(14, 0, true); // Last mod file date
      cdhView.setUint32(16, crc, true); // CRC-32
      cdhView.setUint32(20, size, true); // Compressed size
      cdhView.setUint32(24, size, true); // Uncompressed size
      cdhView.setUint16(28, nameBytes.length, true); // File name length
      cdhView.setUint16(30, 0, true); // Extra field length
      cdhView.setUint16(32, 0, true); // File comment length
      cdhView.setUint16(34, 0, true); // Disk number start
      cdhView.setUint16(36, 0, true); // Internal file attributes
      cdhView.setUint32(38, 0, true); // External file attributes
      cdhView.setUint32(42, offset, true); // Relative offset of local header
      cdh.set(nameBytes, 46);
      centralDirectoryHeaders.push(cdh);

      offset += lfh.length + data.length;
    }

    // 3. End of Central Directory Record
    let cdSize = 0;
    for (const h of centralDirectoryHeaders) cdSize += h.length;

    const eocd = new Uint8Array(22);
    const eocdView = new DataView(eocd.buffer);
    eocdView.setUint32(0, 0x06054b50, true); // Signature
    eocdView.setUint16(4, 0, true); // Number of this disk
    eocdView.setUint16(6, 0, true); // Disk where central directory starts
    eocdView.setUint16(8, this.files.length, true); // Number of central directory records on this disk
    eocdView.setUint16(10, this.files.length, true); // Total number of central directory records
    eocdView.setUint32(12, cdSize, true); // Size of central directory
    eocdView.setUint32(16, offset, true); // Offset of start of central directory
    eocdView.setUint16(20, 0, true); // ZIP file comment length

    const blobParts = [
      ...localFileHeaders,
      ...centralDirectoryHeaders,
      eocd
    ] as unknown as BlobPart[];
    return new Blob(blobParts, { type: 'application/zip' });
  }
}
