const fs = require('fs');

const originalBuffer = Buffer.from('Hello, buffer!');
const copyBuffer = Buffer.alloc(originalBuffer.length);

originalBuffer.copy(copyBuffer);

fs.writeFileSync('buffer_copy.txt', copyBuffer);
console.log('Буфер успішно скопійовано і записано у buffer_copy.txt');
