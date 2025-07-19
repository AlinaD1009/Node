const fs = require('fs');

function bufferWrite(text) {
    const buffer = Buffer.from(text);
    fs.writeFile('buffer_output.txt', buffer, (err) => {
        if (err) throw err;
        console.log(`Довжина буфера в байтах: ${buffer.length}`);
    });
}

bufferWrite("Привіт, світ!");
