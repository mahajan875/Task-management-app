// models/Task.js

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    status: {
        type: String,
        enum: [
            "todo",
            "in-progress",
            "completed"
        ],
        default: "todo"
    },

    priority: {
        type: String,
        enum: [
            "low",
            "medium",
            "high"
        ],
        default: "medium"
    },

    timeSpent: {
        type: Number,
        default: 0
    },

    timerStartedAt: {
        type: Date,
        default: null
    },

    billable: {
        type: Boolean,
        default: false
    },

    dueDate: {
        type: Date
    }

}, {

    timestamps: true
});
taskSchema.index({ status: 1 });

taskSchema.index({ priority: 1 });

taskSchema.index({ dueDate: 1 });

module.exports = mongoose.model(
    "Task",
    taskSchema
);