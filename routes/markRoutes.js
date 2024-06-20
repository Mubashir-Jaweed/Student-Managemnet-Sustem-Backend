const { add_marks, get_marks } = require("../controllers/markController");


const router = require("express").Router();

router.post(
  "/students/:studentId/classes/:classId/courses/:courseId/teachers/:teacherId/marks",
  async (req,res)=>{
    add_marks(req,res)
  }
);
router.get(
  "/students/:studentId/classes/:classId/courses/:courseId/teachers/:teacherId/marks",
 async (req,res)=>{
get_marks(req, res);
 }
);

module.exports = router;
