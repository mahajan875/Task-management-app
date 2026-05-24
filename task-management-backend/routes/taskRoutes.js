const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

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

router.post("/", async (req, res) => {

    try {

        let task = await Task.create(req.body);

        task = await task.populate(
            "assignedTo",
            "name"
        );

        global.io.emit("taskUpdated", task);

        res.status(201).json(task);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

router.put("/:id", async (req, res) => {

    try {

        let updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("assignedTo", "name");

        global.io.emit("taskUpdated", updatedTask);

        res.json(updatedTask);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});
router.post("/:id/start-timer", async (req, res) => {

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        {
            timerStartedAt: new Date()
        },
        { new: true }
    );

    res.json(task);
});

router.post("/:id/stop-timer", async (req, res) => {

    let task = await Task.findById(req.params.id);

    if (!task.timerStartedAt) {

        return res.status(400).json({
            message: "Timer not started"
        });
    }

    const seconds =
        (Date.now() - task.timerStartedAt.getTime()) / 1000;

    task.timeSpent += Math.floor(seconds);

    task.timerStartedAt = null;

    await task.save();

    res.json(task);
});

router.delete("/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

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