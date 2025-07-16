const chalk = require('chalk');
const { getFormattedTime } = require('./time');

console.log(chalk.green(`Файл змінено!`));
console.log(chalk.blue(`Поточна дата: ${getFormattedTime()}`));
