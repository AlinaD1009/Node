const EventEmitter = require('events');

// 1. Будильник
class AlarmClock extends EventEmitter {
  start() {
    setTimeout(() => {
      this.emit('ring');
    }, 5000);
  }
}
const alarm = new AlarmClock();
alarm.on('ring', () => console.log('Прокидайся!'));
alarm.start();


// 2. Покупки в інтернет-магазині
class ShoppingCart extends EventEmitter {
  constructor() {
    super();
    this.total = 0;
  }

  addItem(name, price) {
    this.total += price;
    this.emit('itemAdded', name, this.total);
  }
}
const cart = new ShoppingCart();
cart.on('itemAdded', (name, total) => {
  console.log(`Додано товар: ${name}, Загальна сума: ${total}`);
});
cart.addItem('Книга', 250);
cart.addItem('Мишка', 150);


// 3. Скачування файлу
class FileDownloader extends EventEmitter {
  download() {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      this.emit('progress', progress);
      if (progress >= 100) {
        clearInterval(interval);
        this.emit('completed');
      }
    }, 3000); // кожні 3 секунди додає 10% — імітація повільного завантаження
  }
}
const downloader = new FileDownloader();
downloader.on('progress', (percent) => console.log(`Прогрес: ${percent}%`));
downloader.on('completed', () => console.log('Завантаження завершено'));
downloader.download();


// 4. Підписка на новини
class Newsletter extends EventEmitter {
  subscribe(user) {
    this.on('newArticle', (title) => {
      console.log(`${user} отримав нову статтю: ${title}`);
    });
  }

  newArticle(title) {
    this.emit('newArticle', title);
  }
}
const newsletter = new Newsletter();
newsletter.subscribe('Андрій');
newsletter.subscribe('Марія');
newsletter.newArticle('JavaScript у 2025: нові тренди');


// 5. Блокування банківської карти
class BankCard extends EventEmitter {
  constructor(pin) {
    super();
    this.correctPin = pin;
    this.wrongAttempts = 0;
  }

  enterPin(input) {
    if (input === this.correctPin) {
      console.log('PIN правильний');
      this.wrongAttempts = 0;
    } else {
      this.wrongAttempts++;
      console.log('Невірний PIN');
      if (this.wrongAttempts >= 3) {
        this.emit('blocked');
      }
    }
  }
}
const card = new BankCard('1234');
card.on('blocked', () => console.log('Карта заблокована!'));
card.enterPin('0000');
card.enterPin('1111');
card.enterPin('2222');


// 6. Реєстрація нового користувача
class RegistrationSystem extends EventEmitter {
  register(email) {
    this.emit('userRegistered', email);
  }
}
const reg = new RegistrationSystem();
reg.on('userRegistered', (email) => {
  console.log(`Користувача з email ${email} зареєстровано`);
  console.log(`Вітальний лист надіслано на ${email}`);
});
reg.register('newuser@example.com');


// 7. Чат-кімната
class ChatRoom extends EventEmitter {
  sendMessage(sender, message) {
    this.emit('message', sender, message);
  }
}
const chat = new ChatRoom();
chat.on('message', (sender, message) => {
  console.log(`${sender}: ${message}`);
});
chat.sendMessage('Оля', 'Привіт!');
chat.sendMessage('Іван', 'Хай!');


// 8. Контроль трафіку
class NetworkMonitor extends EventEmitter {
  check(speed) {
    if (speed < 10) {
      this.emit('slowConnection', speed);
    }
  }
}
const monitor = new NetworkMonitor();
monitor.on('slowConnection', (speed) => {
  console.log(`Низька швидкість з'єднання: ${speed} Мбіт/с`);
});
monitor.check(5);


// 9. Ігровий турнір
class Tournament extends EventEmitter {
  constructor() {
    super();
    this.players = {};
  }

  playerWin(name) {
    this.players[name] = (this.players[name] || 0) + 1;
    this.emit('playerWin', name, this.players[name]);
  }
}
const tour = new Tournament();
tour.on('playerWin', (name, wins) => {
  console.log(`${name} переміг! Перемог: ${wins}`);
});
tour.playerWin('Леон');
tour.playerWin('Леон');
tour.playerWin('Міла');


// 10. PomodoroTimer
class PomodoroTimer extends EventEmitter {
  start() {
    console.log('Починаємо 25 хв роботи...');
    setTimeout(() => {
      this.emit('workComplete');
      console.log('Починається 5 хв перерви...');
      setTimeout(() => {
        this.emit('breakComplete');
      }, 5 * 60 * 1000); 
    }, 25 * 60 * 1000); 
  }
}
const pomodoro = new PomodoroTimer();
pomodoro.on('workComplete', () => console.log('Робоча сесія завершена!'));
pomodoro.on('breakComplete', () => console.log('Перерва завершена.'));
pomodoro.start();
