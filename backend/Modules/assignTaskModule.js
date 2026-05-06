const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: String,

  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },

  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  status: String
});

module.exports = mongoose.model("Task", taskSchema);