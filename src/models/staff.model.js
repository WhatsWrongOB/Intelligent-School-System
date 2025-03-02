import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["Teacher", "Non-Teaching"],
    required: true,
  },
  password: {
    type: String,
    required: function () {
      return this.role === "Teaching";
    },
  },
});

const Staff = mongoose.model("Staff", StaffSchema);

export default Staff;
