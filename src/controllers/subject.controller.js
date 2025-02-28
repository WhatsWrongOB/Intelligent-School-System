import Subject from "../models/subject.model.js";
import Class from "../models/class.model.js";

class SubjectController {
  // Create a new subject
  async createSubject(req, res) {
    const { subjectName, classId } = req.body;

    if (!subjectName || !classId) {
      throw new Error("All fields are required");
    }

    const subject = await Subject.create({
      subjectName,
      class: classId,
    });

    return res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject,
    });
  }

  // Get subject by ID subject
  async getSubjectById(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error("All fields are required");
    }

    const subject = await Subject.findById(id);

    return res.status(201).json({
      success: true,
      message: "Subject reterived successfully",
      subject,
    });
  }

  // Update a subject
  async updateSubject(req, res) {
    const { id } = req.params;
    const { subjectName, classId } = req.body;

    if (!id || (!subjectName && !classId)) {
      throw new Error("All fields are required");
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        ...(subjectName && { subjectName }),
        ...(classId && { class: classId }),
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully",
      updatedSubject,
    });
  }

  // Retrieve all subjects or filter by class
  async getSubjects(req, res) {
    const { classId } = req.query;

    const query = {};
    if (classId) query.class = classId;

    const subjects = await Subject.find(query).populate("class", "className");

    return res.status(200).json({
      success: true,
      message: "Subjects retrieved successfully",
      subjects,
    });
  }

  // Delete a subject
  async deleteSubject(req, res) {
    const { id } = req.params;

    if (!id) {
      throw new Error("Subject ID is required");
    }

    await Subject.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Subject deleted successfully",
    });
  }
}

export default new SubjectController();
