const fs = require('fs');

function checkFileAndSize(path) {
    fs.stat(path, (err, stats) => {
        if (err) {
            console.error('Помилка:', err.message);
            return;
        }

        if (stats.isFile()) {
            const sizeKB = stats.size / 1024;
            console.log(`${path} — це файл, розмір: ${sizeKB.toFixed(2)} КБ`);
        } else {
            console.log(`${path} — це не файл`);
        }
    });
}

checkFileAndSize('example.txt');
