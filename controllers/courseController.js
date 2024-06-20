const mongoose = require("mongoose");
const Course = mongoose.model("Course");

module.exports.create_course = async (req, res) => {
  try {
    const { name, description, teacher, classes } = req.body;

    if (!name || !description || !teacher || !classes) {
      return res.status(400).json({ error: "Please Enter All Fields" });
    }

    const course = await Course.findOne({ name });

    if (course) {
      return res
        .status(400)
        .json({ error: "Course already exist With this Name" });
    }

    await new Course({
      name,
      description,
      teacher,
      classes,
    }).save();

    return res.status(200).json({ mes: "Successfully Create Course" });
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_all_courses = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_course_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const course = await Course.findById(id);
      return res.status(200).json(course);
    }
    return res.status(400).json("Course Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.update_course = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Please Enter all Fields" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(id, data);
    if (!updatedCourse) {
      return res.status(400).json({ error: "Course not Found" });
    }
    return res.status(200).json("Course Update");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.delete_course= async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const course = await Course.findByIdAndDelete(id);
      return res.status(200).json("Course deleted successfully");
    }
    return res.status(400).json("Course  Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};


module.exports.search_courses = async (req, res) => {
  try {
    const { search, page = 1, size = 10 } = req.query;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const courses = await Course.find(query)
      .skip((page - 1) * size)
      .limit(parseInt(size));

    const total = await Course.countDocuments(query);

    return res.status(200).json({
      total,
      page: parseInt(page),
      size: parseInt(size),
      courses,
    });
  } catch (error) {
    return res.status(400).json({ message: `Error: ${error}` });
  }
};
