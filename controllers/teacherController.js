const mongoose = require("mongoose");
const Teacher = mongoose.model("Teacher");

module.exports.create_teacher = async (req, res) => {
  try {
    const { name, email, coourse } = req.body;

    if (!name || !email || !coourse) {
      return res.status(400).json({ error: "Please Enter All Fields" });
    }

    const teacher = await Teacher.findOne({ email });

    if (teacher) {
      return res
        .status(400)
        .json({ error: "Teacher already exist With this Email" });
    }

    await new Teacher({
      name,
      email,
      coourse,
    }).save();

    return res.status(200).json({ mes: "Successfully Create Teacher" });
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_all_teacher = async (req, res) => {
  try {
    const teachers = await Teacher.find({});
    return res.status(200).json(teachers);
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_teacher_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const teacher = await Teacher.findById(id);
      return res.status(200).json(teacher);
    }
    return res.status(400).json("Teacher Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.update_teacher = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Please Enter all Fields" });
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(id, data);
    if (!updatedTeacher) {
      return res.status(400).json({ error: "Teacher not Found" });
    }
    return res.status(200).json("Teacher Update");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.delete_teacher = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const teacher = await Teacher.findByIdAndDelete(id);
      return res.status(200).json("teacher deleted successfully");
    }
    return res.status(400).json("Teacher Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};
