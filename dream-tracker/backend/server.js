const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const HttpError = require('./models/http-error');

const DUMMY_DREAMS = [
    {
        id: 'd1',
        title: 'Виграти в лотерею та зникнути на Тенерифе',
        description: 'Вивчити іспанську і їсти паелью на березі океану.',
        category: 'подорож',
        imageUrl: 'https://example.com/vineyard.jpg',
        creator: 'u1'
    },
    {
        id: 'd2',
        title: 'Поїздка до Ісландії',
        description: 'Побачити північне сяйво, гейзери й водоспади. Відчути себе на іншій планеті.',
        category: 'подорож',
        imageUrl: 'https://example.com/iceland.jpg',
        creator: 'u2'
    },
    {
        id: 'd3',
        title: 'Переїхати в човен і плавати без маршруту',
        description: 'Прокидатись із сонцем, працювати віддалено Full Stack developer й слухати аудіокниги. Дивитись на захід.',
        category: 'божевільне',
        imageUrl: 'https://example.com/boatlife.jpg',
        creator: 'u3'
    }
];

app.get('/api/components/:id', (req, res, next) => {
    const dream = DUMMY_DREAMS.find(d => d.id === req.params.id);
    if (!dream) return next(new HttpError('Мрію не знайдено', 404));
    res.json({ dream });
});

app.get('/api/components/user/:uid', (req, res, next) => {
    const dreams = DUMMY_DREAMS.filter(d => d.creator === req.params.uid);
    if (!dreams.length) return next(new HttpError('Мрію не знайдено', 404));
    res.json({ dreams });
});

app.use((err, req, res, next) => {
    res.status(err.code || 500).json({ message: err.message || 'Невідома помилка' });
});

app.listen(5000, () => {
    console.log('Сервер запущено на http://localhost:5000');
});
