const fs = require('fs');
const { Transform } = require('stream');

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const data = chunk.toString().replace(/foo/g, 'bar');
        callback(null, data);
    }
});

const readStream = fs.createReadStream('input.txt', 'utf8');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(transformStream).pipe(writeStream);
