import Student from "../models/student.model.js";

class StudentController {
  // Add a new student
  async registerStudent(req, res) {
    const { name, dob, email, phoneNumber, address, classId } = req.body;

    if (!name || !dob || !email || !phoneNumber || !classId) {
      throw new Error("All fields are required");
    }

    const student = await Student.create({
      name,
      dob,
      email,
      phoneNumber,
      address,
      class: classId,
    });

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  }

  // Retrieve all students
  async getAllStudents(req, res) {
    const { classId, name } = req.query;

    const query = {};

    if (classId) query.class = classId;
    if (name) query.name = { $regex: name, $options: "i" };

    const students = await Student.find(query).populate("class", "className");
    return res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      students,
    });
  }

  // Retrieve details of a specific student by ID
  async getStudentById(req, res) {
    const { id } = req.params;
    const student = await Student.findById(id).populate("class", "className");

    if (!student) {
      throw new Error("Student not found");
    }

    return res.status(200).json({
      success: true,
      message: "Student details retrieved successfully",
      student,
    });
  }

  // Update student details
  async updateStudent(req, res) {
    const { id } = req.params;
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedStudent) {
      throw new Error("Student not found");
    }

    return res.status(200).json({
      success: true,
      message: "Student updated successfully",
      updatedStudent,
    });
  }

  // Remove a student
  async deleteStudent(req, res) {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      throw new Error("Student not found");
    }

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  }
}

export default new StudentController();
