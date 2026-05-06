const express = require("express");
const router = express.Router();
const Project = require("../Modules/addProjectModule");

// ADD
router.post("/", async (req, res) => {
  try {
    await Project.create(req.body);
    res.json({ msg: "success" });
  } catch (e) {
    res.status(500).json({ msg: "error" });
  }
});

// GET ALL
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json({ msg: "success", projects });
  } catch (e) {
    res.status(500).json({ msg: "error" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, req.body);
    res.json({ msg: "success" });
  } catch (e) {
    res.status(500).json({ msg: "error" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "success" });
  } catch (e) {
    res.status(500).json({ msg: "error" });
  }
});

module.exports = router;