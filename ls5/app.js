const readline = require('readline');
const os = require('os');
const { greetUser } = require('./greet');
const { saveUser, checkLoginFromArgs, resetUsersIfFlag } = require('./auth');
const { createSession } = require('./session');
const { logEvent, showLogs } = require('./logger');
const storage = require('./storage');

// 6. Выводим переменные окружения и путь к Node.js
console.log('Змінні середовища:');
console.log(process.env);
global.nodePath = process.execPath;
console.log('Node.js path:', global.nodePath);

// 9. Очистка пользователей
resetUsersIfFlag();

// 10. Логи, если есть флаг
if (process.argv.includes('--show-logs')) {
  showLogs();
  process.exit(0);
}

// 2. Если нет пользователей — создаём admin
if (!global.usersDB['admin']) {
  saveUser('admin', '1234');
}

// 3. Проверка логина
const loggedUser = checkLoginFromArgs();
if (loggedUser) {
  createSession(loggedUser);
  greetUser(loggedUser);
} else {
  console.log('Авторизація не виконана.');
}

// 8. Ввод имени через stdin
function askNameAndSave() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Введіть ім'я користувача: ", (name) => {
    storage.setItem('username', name);
    console.log(`Збережено ім'я: ${name}`);
    rl.close();
  });
}

// Раскомментируй для теста:
// askNameAndSave();

// 5. Вывод из storage
const savedName = storage.getItem('username');
if (savedName) {
  console.log(`Ім'я з storage: ${savedName}`);
}
