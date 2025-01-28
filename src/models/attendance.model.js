import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  attendanceOf: {
    type: String,
    enum: ["Staff", "Student"],
    required: true,
  },
  referenceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "attendanceOf",
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    required: true,
  },
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
