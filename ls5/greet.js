const { logEvent } = require('./logger');

global.callCount = 0;

function greetUser(name) {
  global.callCount++;
  console.log(`Привіт, ${name}!`);
  console.log(`Кількість викликів: ${global.callCount}`);
  logEvent(`greetUser викликана для ${name}`);
}

module.exports = { greetUser };