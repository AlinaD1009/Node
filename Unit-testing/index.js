const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Іван" },
    { id: 2, name: "Марія" },
    { id: 3, name: "Олександр" },
    { id: 4, name: "Катерина" },
    { id: 5, name: "Віктор" },
    { id: 6, name: "Олена" },
    { id: 7, name: "Дмитро" },
    { id: 8, name: "Наталя" },
    { id: 9, name: "Сергій" },
    { id: 10, name: "Ірина" }
];

let nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

app.post('/api/users', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Поле name є обов’язковим' });
    }
    const newUser = { id: nextId++, name };
    users.push(newUser);
    res.status(201).json(newUser);
});

const PORT = 4000;
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app; 
