import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0,
  },
  totalMarks: {
    type: Number,
    required: true,
    min: 0,
  },
  examType: {
    type: String,
    enum: ["Mid", "Final", "Quiz", "Assignment"],
    required: true,
  },
});

const Mark = mongoose.model("Mark", markSchema);

export default Mark;
