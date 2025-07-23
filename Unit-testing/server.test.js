const request = require('supertest');
const app = require('./index');

describe('Express API', () => {
    beforeEach(() => {
        app.locals.users = [
            { id: 1, name: "Іван" },
            { id: 2, name: "Марія" }
        ];
    });

    it('GET /api/users повертає масив користувачів зі статусом 200', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body[0]).toHaveProperty('id');
        expect(res.body[0]).toHaveProperty('name');
    });

    it('POST /api/users створює нового користувача при валідному тілі', async () => {
        const res = await request(app)
        .post('/api/users')
        .send({ name: 'Олег' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Олег');


        const getRes = await request(app).get('/api/users');
        expect(getRes.body.find(u => u.name === 'Олег')).toBeDefined();
    });

    it('POST /api/users повертає 400, якщо ім’я не передано', async () => {
        const res = await request(app).post('/api/users').send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
