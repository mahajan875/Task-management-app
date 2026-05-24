// routes/projectRoutes.js

const express = require("express");

const router = express.Router();

const {
    createProject,
    addTeamMember
} = require("../controllers/projectController");

router.post("/", createProject);

router.put("/:id/add-member", addTeamMember);

module.exports = router;