import Student from "../models/student.model.js";
import Fee from "../models/fee.model.js";

class FeeController {
  // Mark a student's fee as paid for a specific month
  async markFeePaid(req, res) {
    const markedBy = req.user;

    const { studentId, month, isSubmitted } = req.body;

    if (!studentId || !month || !isSubmitted) {
      throw new Error("All fields are requires");
    }

    const fee = await Fee.create({
      markedBy,
      student: studentId,
      month,
      isSubmitted,
    });

    return res.status(200).json({
      success: true,
      message: "Fee marked as paid successfully",
      fee,
    });
  }

  // Update the fee status for a student
  async updateFeeStatus(req, res) {
    const { id } = req.params;
    const markedBy = req.user;
    const { month, isSubmitted } = req.body;

    if (!id || !month || !isSubmitted) {
      throw new Error("All fields are required");
    }

    const updatedFee = await Fee.findByIdAndUpdate(
      id,
      {
        month,
        isSubmitted,
        markedBy,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Fee status updated successfully",
      updatedFee,
    });
  }

  // Retrieve fee status for all studentsrequired
  async getFeeStatus(req, res) {
    const { studentId, month, submitted, markedBy } = req.query;

    const query = {};
    if (month) query.month = month;
    if (studentId) query.student = studentId;
    if (markedBy) query.markedBy = markedBy;
    if (submitted) query.isSubmitted = submitted;

    const fees = await Fee.find(query)
      .populate("markedBy", "name")
      .populate({
        path: "student",
        select: "name class",
        populate: {
          path: "class",
          select: "className",
        },
      });

    return res.status(200).json({
      success: true,
      message: "Fee statuses retrieved successfully",
      fees,
    });
  }
}

export default new FeeController();
