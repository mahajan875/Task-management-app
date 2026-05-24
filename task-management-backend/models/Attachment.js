// models/Attachment.js

const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    },

    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    fileUrl: String

}, { timestamps: true });

module.exports = mongoose.model("Attachment", attachmentSchema);