const mongoose = require("mongoose");
const Student = mongoose.model("Student");

module.exports.create_Student = async (req, res) => {
  try {
    const { name, email, courses, classes } = req.body;

    if (!name || !email || !courses || !classes) {
      return res.status(400).json({ error: "Please Enter All Fields" });
    }

    const student = await Student.findOne({ email });

    if (student) {
      return res
        .status(400)
        .json({ error: "Student already exist With this Email" });
    }

    await new Student({
      name,
      email,
      courses,
      classes,
    }).save();

    return res.status(200).json({ mes: "Successfully Create Student" });
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_all_student = async (req, res) => {
  try {
    const student = await Student.find({});
    return res.status(200).json(student);
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_student_by_id = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const student = await Student.findById(id);
      return res.status(200).json(student);
    }
    return res.status(400).json("Student Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.update_student = async (req, res) => {
  try {
    const id = req.params.id;
    const { data } = req.body;
    if (!data) {
      return res.status(400).json({ error: "Please Enter all Fields" });
    }

    const updatedStudent = await student.findByIdAndUpdate(id, data);
    if (!updatedStudent) {
      return res.status(400).json({ error: "Student not Found" });
    }
    return res.status(200).json("Student Update");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.delete_Student = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const student = await Student.findByIdAndDelete(id);
      return res.status(200).json("Student deleted successfully");
    }
    return res.status(400).json("Student  Not Found");
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};

module.exports.get_student_enrolled_courses_in_class = async (req, res) => {
  try {
    const { studentId , classId } = req.params;
    
    const student =await Student.findById(studentId).populate('courses')

    if(!student){
         return res.status(404).json({ message: "Student Not Found" });
    }
 const classFound = student.classes.find(
   (cls) => cls._id.toString() === classId
 );
 if (!classFound) {
   return res.status(404).json({ message: "Class Not Found for this Student" });
 }

 const enrolledCourses = student.courses.filter((course) =>
   classFound.courses.includes(course._id)
 );

 return res.status(200).json(enrolledCourses);
  } catch (error) {
    return res.status(400).json({ mes: `Error : ${error}` });
  }
};
