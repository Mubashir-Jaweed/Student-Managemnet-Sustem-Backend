const {
  get_all_courses,
  create_course,
  get_course_by_id,
  update_course,
  delete_course,
  search_courses,
} = require("../controllers/courseController");


const router = require("express").Router();

router.get("/Courses", async (req, res) => {
  get_all_courses(req, res);
});

router.post("/course", async (req, res) => {
  create_course(req, res);
});

router.post("/course/:courseId", async (req, res) => {
  get_course_by_id(req, res);
});

router.put("/course/:courseId", async (req, res) => {
  update_course(req, res);
});

router.delete("/course/:courseId", async (req, res) => {
  delete_course(req, res);
});

router.get("/courses", async (req, res) => {
  search_courses(req, res);
});

module.exports = router;
