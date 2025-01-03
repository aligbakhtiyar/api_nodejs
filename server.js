const express = require("express");
const mongoose = require("mongoose");
const Attendance = require("./models/Attendance");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API to Mark Time In
app.post("/attendance/time-in", async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  
    try {
      console.log("Received Request for Time-In:", { userId, today }); // Debugging
  
      const attendance = await Attendance.findOneAndUpdate(
        { userId, date: today },
        { timeIn: new Date().toLocaleTimeString() },
        { upsert: true, new: true }
      );
  
      if (!attendance) {
        console.log("Attendance not found or not created"); // Debugging
        return res.status(404).json({ message: "Attendance record not found" });
      }
  
      console.log("Time-In Marked:", attendance); // Debugging
      res.status(200).json({ message: "Time-in marked successfully", attendance });
    } catch (error) {
      console.error("Error marking Time-In:", error.message); // Debugging
      res.status(500).json({ message: "Error marking time-in", error: error.message });
    }
  });

  app.post("/attendance/time-out", async (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split("T")[0];
  
    try {
        const attendance = await Attendance.findOneAndUpdate(
            { userId, date: today },
            { timeOut: new Date().toLocaleTimeString() },
            { new: true }
          );    
      if (!attendance) return res.status(404).json({ message: "Attendance not found" });
      res.status(200).json({ message: "Time-out marked successfully", attendance });
    } catch (error) {
      res.status(500).json({ message: "Error marking time-out", error: error.message });
    }
  });
  
// API to Mark Time Out
http://localhost:8000

// GET API to Fetch Attendance Data
app.get("/attendance", async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
});

// GET API to Fetch Attendance Data for a Specific User
app.get("/attendance/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const attendance = await Attendance.find({ userId });
    if (attendance.length === 0) {
      return res.status(404).json({ message: "No attendance data found for this user" });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching attendance data", error: error.message });
  }
});

// Connect to MongoDB
async function main() {
  await mongoose.connect(
    "mongodb+srv://codewithbakhtiyar:9808559131@cluster0.cp8fsys.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("Database Connected");
}

main().catch((err) => console.log(err));

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
