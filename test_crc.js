const data = new TextEncoder().encode("hello world");

function crc32_orig(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
      let b = data[i];
      for (let j = 0; j < 8; j++) {
        if ((crc ^ b) & 1) {
          crc = (crc >>> 1) ^ 0xedb88320;
        } else {
          crc = crc >>> 1;
        }
        b >>>= 1;
      }
    }
    return (crc ^ 0xffffffff) >>> 0;
}

function crc32_correct(data) {
    let crc = 0xffffffff;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
        }
    }
    return (crc ^ 0xffffffff) >>> 0;
}

console.log(crc32_orig(data).toString(16));
console.log(crc32_correct(data).toString(16));
