const fs = require('fs');

fs.readFile('package.json', 'utf-8', (err, data) => {
  if (err) return console.error('Помилка:', err);

  const json = JSON.parse(data);
  const author = json.projectAuthor || 'Анонім';
  console.log(`Привіт від автора проєкту: ${author}`);
});
