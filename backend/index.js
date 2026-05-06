const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 4000;
const app = express();
const membeRoute = require('./Routes/membeRoute');
const addProjectRoute = require('./Routes/addProjectRoute');
const addMemberRoute = require('./Routes/addMemberRoute');
const assignTaskRoute = require('./Routes/assignTaskRoute')
const usersRoute = require("./Routes/usersRoute");
// const dotenv=reqiure("dotenv");
require("dotenv").config();
// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= DATABASE =================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ================= ROUTES =================
// const projectRoutes = require("./routes/projectRoutes");
// const taskRoutes = require("./routes/taskRoutes");
// const memberRoutes = require("./routes/memberRoutes");

// ================= USE ROUTES =================
// app.use("/api/project", projectRoutes);
// app.use("/api/task", taskRoutes);
// app.use("/api/member", memberRoutes);

// ================= DEFAULT ROUTE =================
app.get("/", (req, res) => {
  res.send("Task Manager API Running...");
});

//User

app.use("/api/user",usersRoute );

app.use('/api/project',addProjectRoute);


app.use('/api/member',addMemberRoute);


app.use('/api/task',assignTaskRoute);
// ================= SERVER =================


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});