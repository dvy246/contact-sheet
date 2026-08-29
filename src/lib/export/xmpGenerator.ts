import type { ImageItem } from '../types';
import { ZipBuilder } from './zipBuilder';
import { sanitizeFilename } from '../media/fileSanitizer';

function getBaseFilename(filename: string): string {
  const parts = filename.split('.');
  if (parts.length > 1) {
    const ext = parts.pop()?.toLowerCase();
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp' || ext === 'heic') {
      return parts.join('.');
    }
    // Reattach if it was an unknown extension
    return parts.join('.') + '.' + ext;
  }
  return filename;
}

function escapeXml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateXmpString(item: ImageItem): string {
  let rating = 0;
  let label = '';
  
  if (item.status === 'keep') {
    rating = 5;
    label = 'Green';
  } else if (item.status === 'flag') {
    rating = 3;
    label = 'Yellow';
  } else if (item.status === 'reject' || item.status === 'unreviewed') {
    rating = 0;
    label = '';
  }

  const noteDescription = item.notes ? `\n   <dc:description>\n    <rdf:Alt>\n     <rdf:li xml:lang="x-default">${escapeXml(item.notes)}</rdf:li>\n    </rdf:Alt>\n   </dc:description>` : '';

  // Create standard Adobe XMP structure
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        ">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:xmp="http://ns.adobe.com/xap/1.0/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmp:Rating="${rating}"
    xmp:Label="${escapeXml(label)}">
${item.tags && item.tags.length > 0 ? `   <dc:subject>
    <rdf:Bag>
${item.tags.map(t => `     <rdf:li>${escapeXml(t)}</rdf:li>`).join('\n')}
    </rdf:Bag>
   </dc:subject>` : ''}${noteDescription}
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

export async function exportXmpSidecarsZip(images: ImageItem[], zipFilename = 'makecontactsheet-xmp-sidecars'): Promise<void> {
  const builder = new ZipBuilder();
  
  const processedNames = new Set<string>();

  for (const item of images) {
    const baseName = getBaseFilename(item.name);
    let xmpName = baseName + '.xmp';
    
    // Deduplicate names if multiple files have the same base name
    let counter = 1;
    while (processedNames.has(xmpName)) {
      xmpName = `${baseName}_${counter}.xmp`;
      counter++;
    }
    processedNames.add(xmpName);

    const xmpContent = generateXmpString(item);
    builder.addFile(xmpName, xmpContent);
  }

  const blob = builder.buildZipBlob();
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = sanitizeFilename(zipFilename) + '.zip';
  document.body.appendChild(a);
  a.click();
  
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 100);
}
