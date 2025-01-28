import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  month: {
    type: Date,
    required: true,
  },
  isSentToStudent: {
    type: Boolean,
    default: false,
  },
});

const Result = mongoose.model("Result", resultSchema);

export default Result;
