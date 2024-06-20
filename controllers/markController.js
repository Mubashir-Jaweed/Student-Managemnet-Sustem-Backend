const mongoose = require("mongoose");
const Marks = mongoose.model("Marks");

module.exports.add_marks = async (req, res) => {
  try {
    const { studentId, classId, courseId, teacherId } = req.params;
    const { marks } = req.body;

    if (!marks) {
      return res.status(400).json({ error: "Marks are required" });
    }

    const markRecord = new Marks({
      student: studentId,
      class: classId,
      course: courseId,
      teacher: teacherId,
      marks,
    });

    await markRecord.save();
    return res.status(200).json({ message: "Marks added successfully" });
  } catch (error) {
    return res.status(400).json({ message: `Error : ${error}` });
  }
};

module.exports.get_marks = async (req, res) => {
  try {
    const { studentId, classId, courseId, teacherId } = req.params;

    const marks = await Marks.findOne({
      student: studentId,
      class: classId,
      course: courseId,
      teacher: teacherId,
    });

    if (!marks) {
      return res.status(404).json({ message: "Marks Not Found" });
    }

    return res.status(200).json(marks);
  } catch (error) {
    return res.status(400).json({ message: `Error : ${error}` });
  }
};
