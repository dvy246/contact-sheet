import type { ImageItem } from '../types';
import { ZipBuilder } from './zipBuilder';
import { sanitizeFilename } from '../media/fileSanitizer';

function getBaseFilename(filename: string): string {
  // Lightroom and Capture One pair `IMG_0001.xmp` with `IMG_0001.CR2`, so the
  // extension is always dropped — keeping unknown ones produced `IMG_0001.cr2.xmp`
  // for exactly the RAW files sidecars exist for.
  const clean = sanitizeFilename(filename);
  const dot = clean.lastIndexOf('.');
  return dot > 0 ? clean.slice(0, dot) : clean;
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
  // Rejects use the Adobe Bridge `-1` rating plus a Red label so they stay
  // distinguishable from unreviewed frames. Unreviewed frames carry no rating at
  // all: writing 0 would wipe stars already set in the catalog on metadata read.
  let ratingAttrs = '';
  if (item.status === 'keep') {
    ratingAttrs = '\n    xmp:Rating="5"\n    xmp:Label="Green"';
  } else if (item.status === 'flag') {
    ratingAttrs = '\n    xmp:Rating="3"\n    xmp:Label="Yellow"';
  } else if (item.status === 'reject') {
    ratingAttrs = '\n    xmp:Rating="-1"\n    xmp:Label="Red"';
  }

  const noteDescription = item.notes ? `\n   <dc:description>\n    <rdf:Alt>\n     <rdf:li xml:lang="x-default">${escapeXml(item.notes)}</rdf:li>\n    </rdf:Alt>\n   </dc:description>` : '';

  // Create standard Adobe XMP structure
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c140 79.160451, 2017/05/06-01:08:21        ">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:xmp="http://ns.adobe.com/xap/1.0/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"${ratingAttrs}>
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
