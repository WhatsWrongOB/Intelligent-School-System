import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Staff from "../models/staff.model.js";
import catchErrors from "../utils/index.js";

// Admin Authentication Middleware
export const verifyAdminToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized access");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const admin = await Admin.findById(decoded.id);

  if (!admin) {
    throw new Error("Unauthorized access");
  }

  req.user = decoded.id;

  next();
});

// Staff Authentication Middleware
export const verifyTeacherToken = catchErrors(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new Error("Unauthorized access");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const staff = await Staff.findById(decoded.id);

  if (!staff) {
    throw new Error("Unauthorized access");
  }

  req.user = decoded.id;

  next();
});
