const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

// GET TASKS
router.get("/", async (req, res) => {

    try {

        const tasks = await Task.find()
            .populate("assignedTo", "name");

        res.json(tasks);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// CREATE TASK
router.post("/", async (req, res) => {

    try {

        let task = await Task.create(req.body);

        task = await task.populate(
            "assignedTo",
            "name"
        );

        // REALTIME UPDATE
        global.io.emit(
            "taskUpdated",
            task
        );

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// UPDATE TASK
router.put("/:id", async (req, res) => {

    try {

        let updatedTask =
            await Task.findByIdAndUpdate(

                req.params.id,

                req.body,

                { new: true }

            ).populate(
                "assignedTo",
                "name"
            );

        // REALTIME UPDATE
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
});

// START TIMER
router.post("/:id/start-timer", async (req, res) => {

    try {

        let task =
            await Task.findByIdAndUpdate(

                req.params.id,

                {
                    timerStartedAt: new Date()
                },

                { new: true }

            ).populate(
                "assignedTo",
                "name"
            );

        global.io.emit(
            "taskUpdated",
            task
        );

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// STOP TIMER
router.post("/:id/stop-timer", async (req, res) => {

    try {

        let task =
            await Task.findById(
                req.params.id
            );

        if (!task.timerStartedAt) {

            return res.status(400).json({
                message: "Timer not started"
            });
        }

        const seconds =
            (
                Date.now()
                -
                task.timerStartedAt.getTime()
            ) / 1000;

        task.timeSpent +=
            Math.floor(seconds);

        task.timerStartedAt = null;

        await task.save();

        task = await task.populate(
            "assignedTo",
            "name"
        );

        global.io.emit(
            "taskUpdated",
            task
        );

        res.json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// DELETE TASK
router.delete("/:id", async (req, res) => {

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

        // REALTIME DELETE
        global.io.emit(
            "taskDeleted",
            deletedTask._id
        );

        res.json({
            message: "Task Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;