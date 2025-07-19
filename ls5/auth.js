const { hashPassword } = require('./utils');
const { logEvent } = require('./logger');

global.usersDB = {};

function saveUser(login, password) {
  global.usersDB[login] = hashPassword(password);
  logEvent(`Користувач ${login} збережений`);
}

function checkUser(login, password) {
  return global.usersDB[login] === hashPassword(password);
}

function checkLoginFromArgs() {
  const args = process.argv.slice(2);
  const loginIndex = args.indexOf('--login');
  const passIndex = args.indexOf('--password');
  if (loginIndex === -1 || passIndex === -1) return null;

  const login = args[loginIndex + 1];
  const password = args[passIndex + 1];

  if (checkUser(login, password)) {
    logEvent(`Авторизація успішна: ${login}`);
    return login;
  } else {
    logEvent(`Невдала авторизація: ${login}`);
    return null;
  }
}

function resetUsersIfFlag() {
  if (process.argv.includes('--reset')) {
    global.usersDB = {};
    logEvent('Користувачі очищені (--reset)');
    console.log('Користувачі очищені');
  }
}

module.exports = {
  saveUser,
  checkLoginFromArgs,
  resetUsersIfFlag
};
