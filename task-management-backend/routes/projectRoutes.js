const express = require("express");

const router = express.Router();

const {
    createProject,
    addTeamMember
} = require("../controllers/projectController");

const Project = require("../models/Project");

// GET ALL PROJECTS
router.get("/", async (req, res) => {

    try {

        const projects =
            await Project.find();

        res.json(projects);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
});

// CREATE PROJECT
router.post("/", createProject);

// ADD TEAM MEMBER
router.put(
    "/:id/add-member",
    addTeamMember
);

module.exports = router;