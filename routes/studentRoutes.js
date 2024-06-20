const { get_all_student, create_Student, get_student_by_id, update_student, delete_Student, get_student_enrolled_courses_in_class } = require("../controllers/studentController");


const router = require("express").Router();

router.get("/students", async (req, res) => {
  get_all_student(req, res);
});

router.post("/student", async (req, res) => {
  create_Student(req, res);
});

router.post("/student/:studentId", async (req, res) => {
  get_student_by_id(req, res);
});

router.put("/student/:studentId", async (req, res) => {
  update_student(req, res);
});

router.delete("/student/:studentId", async (req, res) => {
  delete_Student(req, res);
});
router.get("/student/:studentId/class/:classId/course", async (req, res) => {
 get_student_enrolled_courses_in_class(req, res);
});

module.exports = router;
