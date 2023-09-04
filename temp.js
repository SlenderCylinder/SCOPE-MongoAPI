// app.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const Task = require('./models/task');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Create a new task
app.post('/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a task by ID
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Retrieve all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
