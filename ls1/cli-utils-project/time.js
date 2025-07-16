const dayjs = require('dayjs');

function getFormattedTime() {
  return dayjs().format('DD/MM/YYYY HH:mm:ss');
}

module.exports = { getFormattedTime };
