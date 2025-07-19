const fs = require('fs');

const text = 'Деякий текст для буфера';
const buffer = Buffer.from(text);

const json = JSON.stringify(buffer.toJSON());

fs.writeFileSync('buffer.json', json);

const data = fs.readFileSync('buffer.json', 'utf8');
const parsed = JSON.parse(data);

const restoredBuffer = Buffer.from(parsed.data);

console.log(restoredBuffer.toString());
