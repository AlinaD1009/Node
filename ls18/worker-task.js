const { parentPort } = require('worker_threads');

let sum = 0;
for (let i = 1; i <= 1e9; i++) {
  sum += i;
}
parentPort.postMessage(sum);

