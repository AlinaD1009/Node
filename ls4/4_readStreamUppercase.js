const fs = require('fs');

const stream = fs.createReadStream('largefile.txt', { encoding: 'utf8' });

stream.on('data', (chunk) => {
    console.log(chunk.toUpperCase());
});
