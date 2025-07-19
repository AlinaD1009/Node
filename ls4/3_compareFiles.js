const fs = require('fs');

const bufA = fs.readFileSync('a.txt');
const bufB = fs.readFileSync('b.txt');

const comparison = Buffer.compare(bufA, bufB);

if (comparison === 0) {
    console.log('Файли однакові');
} else if (comparison < 0) {
    console.log('Файл a.txt "менший" за b.txt');
} else {
    console.log('Файл a.txt "більший" за b.txt');
}
