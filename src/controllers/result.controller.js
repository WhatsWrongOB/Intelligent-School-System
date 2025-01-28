import Student from "../models/student.model.js";
import Result from "../models/result.model.js";

class ResultController {
  // Create the result submission status for a student
  async createResultStatus(req, res) {
    const { studentId, isSentToStudent, month } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const result = await Result.create({
      student: studentId,
      month,
      isSentToStudent,
    });

    return res.status(200).json({
      success: true,
      message: "Result status created successfully",
      result,
    });
  }

  // Update the result submission status for a student

  async updateResultStatus(req, res) {
    const { id } = req.params;
    const { studentId, isSentToStudent, month } = req.body;

    const student = await Student.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const result = await Result.findByIdAndUpdate(
      id,
      {
        month,
        isSentToStudent,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Result status created successfully",
      result,
    });
  }

  // Retrieve result submission records for all students
  async getResultStatus(req, res) {
    const { sent, month, studentId } = req.query;

    const query = {};
    if (month) query.month = month;
    if (studentId) query.student = studentId;
    if (sent) query.isSentToStudent = sent;

    const results = await Result.find(query).populate("student", "name email");

    return res.status(200).json({
      success: true,
      message: "Result statuses retrieved successfully",
      results,
    });
  }
}

export default new ResultController();
