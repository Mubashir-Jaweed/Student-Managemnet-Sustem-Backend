const mongoose = require("mongoose");
const Class = mongoose.model("Class");

module.exports.create_class = async (req, res) => {
  try {
    const { name, students, course } = req.body;

    if (!name || !students || !course) {
      return res.status(400).json({ error: "Please Enter All Fields" });
    }

    const CLASS = await Class.findOne({ name });

    if (CLASS) {
      return res
        .status(400)
        .json({ error: "Class already exist With this Name" });
    }

    await new Class({
      name,
      students,
      course,
    }).save();

    return res.status(200).json({ mes: "Successfully Create Class" });
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_all_Classes = async (req, res) => {
  try {
    const CLASS = await Class.find({});
    return res.status(200).json(CLASS);
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_class_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const CLASS = await Class.findById(id);
      return res.status(200).json(CLASS);
    }
    return res.status(400).json("Class Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.update_Class = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Please Enter all Fields" });
    }

    const updatedClass = await Class.findByIdAndUpdate(id, data);
    if (!updatedClass) {
      return res.status(400).json({ error: "Class not Found" });
    }
    return res.status(200).json("Class Update");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.delete_Class= async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const CLASS = await Class.findByIdAndDelete(id);
      return res.status(200).json("Class deleted successfully");
    }
    return res.status(400).json("Class  Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};
