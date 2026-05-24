// controllers/projectController.js

const Project = require("../models/Project");

exports.createProject = async (req, res) => {

    try {

        const project = await Project.create(req.body);

        res.status(201).json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addTeamMember = async (req, res) => {

    try {

        const project = await Project.findById(req.params.id);

        project.teamMembers.push(req.body.userId);

        await project.save();

        res.json(project);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};