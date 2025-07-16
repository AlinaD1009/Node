const fs = require('fs');
const path = require('path');
const { formatName } = require('./formatter');
const dayjs = require('dayjs');

const args = process.argv.slice(2);


if (args[0] === 'create-log') {
  const dir = args[1] ? path.resolve(args[1]) : process.cwd();
  const filePath = path.join(dir, 'log.txt');

  fs.mkdir(dir, { recursive: true }, (err) => {
    if (err) {
      console.error('Помилка створення директорії:', err);
      process.exit(1);
    }

    fs.writeFile(filePath, 'Лог створено', (err) => {
      if (err) {
        console.error('Помилка запису файлу:', err);
        process.exit(1);
      }
      console.log('Файл log.txt створено у', dir);
    });
  });
}

else if (args.length === 1) {
  const name = formatName(args[0]);
  console.log(`Привіт, ${name}`);
} else {
  console.log('Використання:');
  console.log('  node app.js create-log [директорія]');
  console.log('  node app.js Ім’я');
}

const { log } = require('./logger');

log('info', 'Запуск додатку');
log('error', 'Щось пішло не так');

const { getEnvConfig } = require('./env');
console.log(getEnvConfig());
