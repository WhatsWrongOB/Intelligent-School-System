import express from "express";
import  catchError  from "../utils/index.js"; 
import FeeController from "../controllers/fee.controller.js";
import StaffController from "../controllers/staff.controller.js";
import MarksController from "../controllers/mark.controller.js";
import ClassController from "../controllers/class.controller.js";
import ResultController from "../controllers/result.controller.js";
import StudentController from "../controllers/student.controller.js";
import SubjectController from "../controllers/subject.controller.js";
import AuthController from "../controllers/authentication.controller.js";
import AttendanceController from "../controllers/attendance.controller.js";
import { verifyAdminToken, verifyTeacherToken } from "../middlewares/index.js";
import insightsController from "../controllers/insights.controller.js";

const router = express.Router();

// /_____________________________Authentication Routes_________________________________
router.post("/admin/register", catchError(AuthController.registerAdmin));
router.post("/admin/login", catchError(AuthController.loginAdmin));
router.get("/admin/logout",verifyAdminToken,  catchError(AuthController.logoutAdmin));
router.post("/admin/update-password", verifyAdminToken, catchError(AuthController.updateAdminPassword));
router.post("/staff/register",verifyAdminToken, catchError(AuthController.registerStaff));
router.post("/staff/login", catchError(AuthController.loginStaff));
router.get("/staff/logout",verifyTeacherToken,  catchError(AuthController.logoutStaff));
router.post("/staff/update-password",verifyTeacherToken, catchError(AuthController.updateStaffPassword));

router.get("/insights", catchError(insightsController.getInsights));


// /_________________________Subject Routes_________________________________
router.post("/subject",catchError(SubjectController.createSubject));
router.get("/subject", catchError(SubjectController.getSubjects));
router.get("/subject/:id", catchError(SubjectController.getSubjectById));
router.patch("/subject/:id", catchError(SubjectController.updateSubject));
router.delete("/subject/:id", catchError(SubjectController.deleteSubject));

// / _________________________Marks Routes_________________________________
router.post("/marks",  catchError(MarksController.addMarks));
router.post("/marks/bulk",  catchError(MarksController.bulkUploadMarks));
router.get("/marks",  catchError(MarksController.getMarks));
router.patch("/marks/:id",  catchError(MarksController.updateMarks));
router.delete("/marks/:id",  catchError(MarksController.deleteMarks));

// /_____________________________Routes for Student Management___________________________
router.post("/student",  catchError(StudentController.registerStudent));
router.get("/student",  catchError(StudentController.getAllStudents));
router.get("/student/:id",  catchError(StudentController.getStudentById));
router.patch("/student/:id",  catchError(StudentController.updateStudent));
router.delete("/student/:id",  catchError(StudentController.deleteStudent));

// /__________________________Routes for Staff Management_____________________
router.get("/staff", catchError(StaffController.getAllStaff));
router.get("/staff/:id",  catchError(StaffController.getStaffById));
router.patch("/staff/:id",  catchError(StaffController.updateStaff));
router.delete("/staff/:id",  catchError(StaffController.deleteStaff));

// /_______________________Routes for Result Management______________________________________
router.post("/result",  catchError(ResultController.createResultStatus));
router.get("/result",  catchError(ResultController.getResultStatus));
router.patch("/result/:id",  catchError(ResultController.updateResultStatus));
router.get("/result/:studentId",  catchError(ResultController.getResultStatusByStudentId));

// /______________________Routes for Fee Management_______________________________
router.post("/fee",  catchError(FeeController.markFeePaid));
router.patch("/fee/:id",  catchError(FeeController.updateFeeStatus));
router.get("/fee",  catchError(FeeController.getFeeStatus));

// /____________________Routes for Class Management__________________________________
router.post("/class",  catchError(ClassController.createClass));
router.get("/class", catchError(ClassController.getAllClasses));
router.get("/class/:id",  catchError(ClassController.getClassById));
router.patch("/class/:id",  catchError(ClassController.updateClass));
router.delete("/class/:id",  catchError(ClassController.deleteClass));

// ________________________________________Routes for Student Attendance_______________________________________
router.post("/attendance/student/mark",verifyTeacherToken , catchError(AttendanceController.markStudentAttendance));
router.get("/attendance/student",  catchError(AttendanceController.getStudentAttendance));
router.get("/attendance/student/:studentId",  catchError(AttendanceController.getAttendanceByStudentId));

// _______________________________________Routes for Staff Attendance__________________________________________
router.post("/attendance/staff/mark",verifyAdminToken , catchError(AttendanceController.markStaffAttendance));
router.get("/attendance/staff",verifyAdminToken,  catchError(AttendanceController.getStaffAttendance));
router.get("/attendance/staff/:staffId",verifyAdminToken,  catchError(AttendanceController.getAttendanceByStaffId));

export default router;
