const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];
let idCounter = 1;

app.get('/tasks', (req, res) => {
    const status = req.query.status || 'all';
    let filteredTasks = tasks;
    if (status === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (status === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    res.json(filteredTasks);
});

app.post('/tasks', (req, res) => {
    const { title, description, duration } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTask = {
        id: idCounter++,
        title,
        description: description || '',
        duration: duration || 25,  // тут duration
        completed: false,
        timeSpent: 0,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.put('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    const { title, description, duration, completed, timeSpent } = req.body;

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (duration !== undefined) task.duration = duration;  // тоже duration
    if (completed !== undefined) task.completed = completed;
    if (timeSpent !== undefined) task.timeSpent = timeSpent;

    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const id = Number(req.params.id);
    tasks = tasks.filter(t => t.id !== id);
    res.status(204).send();
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
