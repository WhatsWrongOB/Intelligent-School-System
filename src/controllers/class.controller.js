import Class from "../models/class.model.js";
import Staff from "../models/staff.model.js";

class ClassController {
  // Create a new class
  async createClass(req, res) {
    const { className, teacherId } = req.body;

    if (!className || !teacherId) {
      throw new Error("Class name and teacher ID are required");
    }

    const teacher = await Staff.findById(teacherId);

    if (teacher.role !== "Teacher") {
      throw new Error("Invalid teacher Id");
    }

    const newClass = await Class.create({
      className,
      teacher: teacherId,
    });

    return res.status(201).json({
      success: true,
      message: "Class created successfully",
      newClass,
    });
  }

  // Retrieve all classes
  async getAllClasses(req, res) {
    const { teacherId, name } = req.query;

    const query = {};

    if (teacherId) query.teacher = teacherId;
    if (name) query.className = { $regex: name, $options: "i" };

    const classes = await Class.find(query).populate(
      "teacher",
      "name email role"
    );
    return res.status(200).json({
      success: true,
      message: "Classes retrieved successfully",
      classes,
    });
  }

  // Retrieve details of a specific class by ID
  async getClassById(req, res) {
    const { id } = req.params;
    const singleClass = await Class.findById(id).populate(
      "teacher",
      "name email role"
    );

    if (!singleClass) {
      throw new Error("Class not found");
    }

    return res.status(200).json({
      success: true,
      message: "Class details retrieved successfully",
      singleClass,
    });
  }

  // Update class details
  async updateClass(req, res) {
    const { id } = req.params;
    const updatedClass = await Class.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedClass) {
      throw new Error("Class not found");
    }

    return res.status(200).json({
      success: true,
      message: "Class updated successfully",
      updatedClass,
    });
  }

  // Delete a class
  async deleteClass(req, res) {
    const { id } = req.params;
    const deletedClass = await Class.findByIdAndDelete(id);

    if (!deletedClass) {
      throw new Error("Class not found");
    }

    return res.status(200).json({
      success: true,
      message: "Class deleted successfully",
    });
  }
}

export default new ClassController();
