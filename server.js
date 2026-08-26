const express = require("express");

const app = express();

const PORT = 5050;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Temporary task data
let tasks = [
    {
        id: 1,
        title: "Learn Docker",
        completed: false
    },
    {
        id: 2,
        title: "Create Dockerfile",
        completed: false
    }
];

// Home page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// Health check
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Task Manager is running"
    });
});

// Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
});

// Get task by ID
app.get("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    res.json(task);
});

// Add a task
app.post("/api/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Task title is required"
        });
    }

    const newTask = {
        id: tasks.length + 1,
        title: title,
        completed: false
    };

    tasks.push(newTask);

    res.status(201).json(newTask);
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const taskExists = tasks.some(task => task.id === id);

    if (!taskExists) {
        return res.status(404).json({
            message: "Task not found"
        });
    }

    tasks = tasks.filter(task => task.id !== id);

    res.json({
        message: "Task deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});