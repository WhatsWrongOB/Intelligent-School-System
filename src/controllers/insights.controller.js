import Student from "../models/student.model.js";
import Staff from "../models/staff.model.js";
import Subject from "../models/subject.model.js";

class InsightController {
  async getInsights(req, res) {
    const totalStudents = await Student.countDocuments();
    const totalTeachers = await Staff.find({
      role: "Teacher",
    }).countDocuments();
    const totalNonTeaching = await Staff.find({
      role: "Teacher",
    }).countDocuments();
    const subjectsName = await Subject.find().select("subjectName -_id");

    return res.status(200).json({
      success: true,
      message: "Insight fetched succesfuly",
      insights: {
        totalStudents,
        totalTeachers,
        totalNonTeaching,
        subjectsName
      },
    });
  }
}

export default new InsightController();
