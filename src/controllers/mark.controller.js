import Mark from "../models/mark.model.js";
import Student from "../models/student.model.js";
import Subject from "../models/subject.model.js";

class MarksController {
  // Add bulk marks for all students in a class for the same subject
  async bulkUploadMarks(req, res) {
    const { subjectId, marksData, examType } = req.body;

    if (!subjectId || !marksData || !examType) {
      throw new Error("Subject ID, marks data, and exam type are required");
    }

    if (!Array.isArray(marksData) || marksData.length === 0) {
      throw new Error("Marks data must be a non-empty array");
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new Error("Invalid subject ID");
    }

    const studentIds = marksData.map((entry) => entry.studentId);
    const students = await Student.find({ _id: { $in: studentIds } });

    if (students.length !== marksData.length) {
      throw new Error("Some student IDs are invalid");
    }

    const bulkMarks = marksData.map((entry) => ({
      student: entry.studentId,
      subject: subjectId,
      marksObtained: entry.marksObtained,
      totalMarks: entry.totalMarks,
      examType,
    }));

    const savedMarks = await Mark.insertMany(bulkMarks);

    return res.status(201).json({
      success: true,
      message: "Marks uploaded successfully for all students",
      savedMarks,
    });
  }

  // Add marks for a student in a specific subject
  async addMarks(req, res) {
    const { studentId, subjectId, marksObtained, totalMarks, examType } =
      req.body;

    if (
      !studentId ||
      !subjectId ||
      !marksObtained ||
      !totalMarks ||
      !examType
    ) {
      throw new Error("All fields are required");
    }examType

    const marks = await Mark.create({
      student: studentId,
      subject: subjectId,
      marksObtained,
      totalMarks,
      examType,
    });

    return res.status(201).json({
      success: true,
      message: "Marks added successfully",
      marks,
    });
  }

  // Update marks for a student in a specific subject
  async updateMarks(req, res) {
    const { id } = req.params;
    const { marksObtained, totalMarks, examType } = req.body;

    if (!id || (!marksObtained && !totalMarks && !examType)) {
      throw new Error("All fields are required");
    }

    const updatedMarks = await Mark.findByIdAndUpdate(
      id,
      {
        ...(marksObtained && { marksObtained }),
        ...(totalMarks && { totalMarks }),
        ...(examType && { examType }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Marks updated successfully",
      updatedMarks,
    });
  }

  // Retrieve marks based on filters
  async getMarks(req, res) {
    const { studentId, subjectId, examType } = req.query;

    const query = {};
    if (studentId) query.student = studentId;
    if (subjectId) query.subject = subjectId;
    if (examType) query.examType = examType;

    const marks = await Mark.find(query)
      .populate("student", "name email")
      .populate("subject", "subjectName");

    return res.status(200).json({
      success: true,
      message: "Marks retrieved successfully",
      marks,
    });
  }

  // Delete marks for a student in a specific subject
  async deleteMarks(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Marks ID is required");
    }

    await Mark.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Marks deleted successfully",
    });
  }
}

export default new MarksController();
