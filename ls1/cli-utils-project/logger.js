const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

function log(level, message) {
  const time = dayjs().format('YYYY-MM-DD HH:mm:ss');
  const logMessage = `[${time}] [${level.toUpperCase()}] ${message}\n`;
  fs.appendFileSync(path.join(__dirname, 'app.log'), logMessage);
}

module.exports = { log };
