// controllers/taskController.js

const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try {

        const task = await Task.create(req.body);

        io.emit("taskCreated", task);

        res.status(201).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        io.emit("taskUpdated", task);

        res.json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {

        await Task.findByIdAndDelete(req.params.id);

        io.emit("taskDeleted", req.params.id);

        res.json({ message: "Task Deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};