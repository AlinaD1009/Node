const fs = require('fs').promises;
const path = require('path');

const inputDir = path.join(__dirname, 'input');
const outputDir = path.join(__dirname, 'output');

async function copyFiles() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    const files = await fs.readdir(inputDir);

    for (const file of files) {
      const src = path.join(inputDir, file);
      const dest = path.join(outputDir, file);
      await fs.copyFile(src, dest);
    }

    console.log('Файли успішно скопійовано.');
  } catch (err) {
    console.error('Помилка копіювання:', err);
  }
}

copyFiles();
