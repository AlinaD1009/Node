const fs = require('fs');

const globalKeys = Object.keys(global);
const sortedKeys = globalKeys.sort((a, b) => a.length - b.length);

fs.writeFile('globals.txt', sortedKeys.join('\n'), (err) => {
  if (err) return console.error('Помилка запису:', err);
  console.log('Файл globals.txt створено');
});
