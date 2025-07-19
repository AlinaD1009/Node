global.logs = [];

function logEvent(event) {
  const timestamp = new Date().toISOString();
  global.logs.push({ timestamp, event });
}

function showLogs() {
  console.log('--- Логи ---');
  global.logs.forEach(log => {
    console.log(`[${log.timestamp}] ${log.event}`);
  });
}

module.exports = { logEvent, showLogs };
