const fs = require('fs');

const buffer1 = Buffer.from('Hello, ');
const buffer2 = Buffer.from('world!');
const bufferConcat = Buffer.concat([buffer1, buffer2]);

console.log(bufferConcat.toString());

fs.writeFileSync('concat_output.txt', bufferConcat);
