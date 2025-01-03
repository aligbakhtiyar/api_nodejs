const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true }, // Storing date as a string in `YYYY-MM-DD` format
    timeIn: { type: String, default: null },
    timeOut: { type: String, default: null },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;
