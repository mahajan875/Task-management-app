// models/Project.js

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: String,

    description: String,

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    teamMembers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    progress: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);