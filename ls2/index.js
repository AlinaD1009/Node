// Задание 4: модуль os
const os = require('os');
console.log('Username:', os.userInfo().username);

// Задание 5: модуль path
const path = require('path');
const filePath = path.join(__dirname, 'data.txt');
console.log('Absolute path to data.txt:', filePath);

// Задание 6: модуль fs
const fs = require('fs');
const files = fs.readdirSync('.');
console.log('Files in current directory:', files);
