const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String
});

module.exports = mongoose.model("Project", projectSchema);