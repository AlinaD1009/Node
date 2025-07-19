const fs = require('fs');
const path = require('path');

const folderPath = './temp';

fs.readdir(folderPath, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    const filePath = path.join(folderPath, file);

    fs.stat(filePath, (err, stats) => {
      if (err) throw err;

      const now = Date.now();
      const mtime = new Date(stats.mtime).getTime();

      if (now - mtime > 2 * 60 * 1000) {
        fs.unlink(filePath, (err) => {
          if (err) throw err;
          console.log(`Видалено файл: ${file}`);
        });
      }
    });
  });
});
