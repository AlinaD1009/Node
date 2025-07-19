const { logEvent } = require('./logger');

global.sessions = {};

function createSession(user) {
  global.sessions[user] = { loggedInAt: new Date().toISOString() };
  logEvent(`Сесія створена для ${user}`);
}

module.exports = { createSession };
