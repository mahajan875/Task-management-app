const Task = require("../models/Task");

// CREATE TASK
exports.createTask = async (req, res) => {

    try {

        const task = await Task.create(req.body);

        const populatedTask =
            await Task.findById(task._id)
            .populate("assignedTo");

        global.io.emit(
            "taskUpdated",
            populatedTask
        );

        res.status(201).json(populatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// GET ALL TASKS
exports.getTasks = async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("assignedTo")
            .populate("project");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// UPDATE TASK
exports.updateTask = async (req, res) => {

    try {

        const updatedTask =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,

                {
                    new: true
                }

            )
            .populate("assignedTo")
            .populate("project");

        global.io.emit(
            "taskUpdated",
            updatedTask
        );

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

// DELETE TASK
exports.deleteTask = async (req, res) => {

    try {

        const deletedTask =
            await Task.findByIdAndDelete(
                req.params.id
            );

        if (!deletedTask) {

            return res.status(404).json({
                message: "Task not found"
            });
        }

        global.io.emit(
            "taskDeleted",
            deletedTask._id
        );

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};