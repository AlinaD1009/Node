const fs = require('fs');
const path = 'log.txt';

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFile(path, logMessage, (err) => {
        if (err) throw err;
    });
}

log('Подія успішно записана');
