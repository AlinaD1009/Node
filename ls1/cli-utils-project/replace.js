const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

const srcIndex = args.indexOf('--src');
const destIndex = args.indexOf('--dest');

if (srcIndex === -1 || destIndex === -1 || !args[srcIndex + 1] || !args[destIndex + 1]) {
  console.log('Використання: node replace.js --src input.txt --dest output.txt');
  process.exit(1);
}

const srcPath = args[srcIndex + 1];
const destPath = args[destIndex + 1];

fs.readFile(srcPath, 'utf-8', (err, data) => {
  if (err) return console.error('Помилка читання файлу:', err);

  const replaced = data.replace(/\btest\b/gi, 'exam');

  fs.writeFile(destPath, replaced, (err) => {
    if (err) return console.error('Помилка запису:', err);
    console.log('Заміна виконана, результат збережено в', destPath);
  });
});
