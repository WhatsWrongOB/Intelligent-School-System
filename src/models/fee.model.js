import mongoose from "mongoose";

const feeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
    required: true,
  },
  markedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
});

const Fee = mongoose.model("Fee", feeSchema);

export default Fee;
