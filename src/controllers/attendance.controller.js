import Attendance from "../models/attendance.model.js";
import Student from "../models/student.model.js";
import nodemailer from "nodemailer";

class AttendanceController {
  // Mark student attendance
  async markStudentAttendance(req, res) {
    const { attendanceRecords } = req.body;

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      throw new Error("Attendance records must be a non-empty array");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        port: process.env.SMTP_PORT,
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const formattedRecords = await Promise.all(
      attendanceRecords.map(async (record) => {
        const student = await Student.findById(record.studentId);

        if (!student) {
          throw new Error(`Student with ID ${record.studentId} not found`);
        }

        if (record.status === "Absent") {
          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: student.email,
            subject: "Attendance Alert",
            text: `Dear ${student.name},\n\nYou have been marked as absent on ${record.date}.\n\nPlease ensure to attend the classes regularly.\n\nBest regards,\nSchool Management`,
          });
        }

        return {
          attendanceOf: "Student",
          date: record.date,
          status: record.status,
          referenceId: record.studentId,
        };
      })
    );

    const savedRecords = await Attendance.insertMany(formattedRecords);

    return res.status(201).json({
      success: true,
      message: "Student attendance marked successfully",
      savedRecords,
    });
  }

  // Retrieve attendance records for all students
  async getStudentAttendance(req, res) {
    const attendances = await Attendance.find({
      attendanceOf: "Student",
    }).populate("referenceId", "name email");

    return res.status(200).json({
      success: true,
      message: "Student attendance records retrieved successfully",
      attendances,
    });
  }

  // Retrieve attendance details for a specific student
  async getAttendanceByStudentId(req, res) {
    const { studentId } = req.params;

    if (!studentId) {
      throw new Error("Student ID not provided");
    }

    const attendanceRecords = await Attendance.find({
      attendanceOf: "Student",
      referenceId: studentId,
    }).populate("referenceId", "name email");

    return res.status(200).json({
      success: true,
      message: "Attendance details retrieved successfully",
      attendanceRecords,
    });
  }

  // Mark attendance for staff in bulk
  async markStaffAttendance(req, res) {
    const { attendanceRecords } = req.body;

    if (!Array.isArray(attendanceRecords) || attendanceRecords.length === 0) {
      throw new Error("Attendance records must be a non-empty array");
    }

    const formattedRecords = attendanceRecords.map((record) => ({
      attendanceOf: "Staff",
      date: record.date,
      status: record.status,
      referenceId: record.staffId,
    }));

    const savedRecords = await Attendance.insertMany(formattedRecords);

    return res.status(201).json({
      success: true,
      message: "Staff attendance marked successfully",
      savedRecords,
    });
  }

  // Retrieve attendance records for all staff members
  async getStaffAttendance(req, res) {
    const attendances = await Attendance.find({
      attendanceOf: "Staff",
    }).populate("referenceId", "name email role");

    return res.status(200).json({
      success: true,
      message: "Staff attendance records retrieved successfully",
      attendances,
    });
  }

  // Retrieve attendance details for a specific staff member
  async getAttendanceByStaffId(req, res) {
    const { staffId } = req.params;

    if (!staffId) {
      throw new Error("Staff ID not provided");
    }

    const attendanceRecords = await Attendance.find({
      attendanceOf: "Staff",
      referenceId: staffId,
    });

    return res.status(200).json({
      success: true,
      message: "Staff attendance details retrieved successfully",
      attendanceRecords,
    });
  }
}

export default new AttendanceController();
