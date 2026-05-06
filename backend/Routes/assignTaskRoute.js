const express = require("express");
const router = express.Router();
const Task = require("../Modules/assignTaskModule");


// ================= ADD TASK =================
router.post("/", async (req, res) => {
  try {
    await Task.create(req.body);
    res.json({ msg: "success" });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
});


// ================= GET ALL TASKS =================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("projectId")
      .populate("assignedTo");

    res.json({ msg: "success", tasks });
  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
});


// ================= GET TASKS FOR ONE USER =================
router.get("/user/:id", async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.params.id
    })
      .populate("projectId")
      .populate("assignedTo");

    res.json({ msg: "success", tasks });

  } catch (err) {
    res.status(500).json({ msg: "error" });
  }
});


// ================= 🔥 UPDATE TASK STATUS =================
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    await Task.findByIdAndUpdate(req.params.id, {
      status
    });

    res.json({ msg: "success" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "error" });
  }
});


module.exports = router;