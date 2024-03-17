require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { URL } = require("./utils/config");

// getting all routers
const loginRouter = require("./Routes/loginRoutes");
const studentRouter = require("./Routes/studentRoutes");

app.use(express.json());
app.use(cors());

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)

  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Welcome to Zen-Dashboard");
});

// Routes
app.use(studentRouter);
app.use(loginRouter);

let attendanceData = {
  presentDays: 37,
  totalDays: 42,
};

// Endpoint to get attendance data
app.get("/api/attendance", (req, res) => {
  res.json(attendanceData);
});

// Endpoint to update attendance data
app.post("/api/attendance", (req, res) => {
  const { presentDays, totalDays } = req.body;

  // Validate and update attendance data
  attendanceData = {
    presentDays: parseInt(presentDays, 10),
    totalDays: parseInt(totalDays, 10),
  };

  res.json(attendanceData);
});

let taskScoreData = [];

for (let day = 1; day <= 42; day++) {
  const randomScore = Math.floor(Math.random() * 101); // Generating a random score between 0 and 100
  taskScoreData.push({ day, score: randomScore });
}

console.log(taskScoreData);

// Endpoint to get task score data
app.get("/api/tasks", (req, res) => {
  res.json(taskScoreData);
});

// Endpoint to update task score data
app.post("/api/tasks", (req, res) => {
  const updatedTaskScoreData = req.body;

  // Validate and update task score data
  taskScoreData = updatedTaskScoreData;

  res.json(taskScoreData);
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log("server is started", process.env.PORT);
});

module.exports = app;
