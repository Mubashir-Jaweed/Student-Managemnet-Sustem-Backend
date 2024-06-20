const { get_all_Classes, create_class, get_class_by_id, update_Class, delete_Class, search_classes } = require("../controllers/classController");


const router = require("express").Router();

router.get("/classes", async (req, res) => {
  get_all_Classes(req, res);
});

router.post("/class", async (req, res) => {
  create_class(req, res);
});

router.post("/class/:classId", async (req, res) => {
  get_class_by_id(req, res);
});

router.put("/class/:classId", async (req, res) => {
  update_Class(req, res);
});

router.delete("/class/:classId", async (req, res) => {
  delete_Class(req, res);
});


router.get("/classes", async (req, res) => {
  search_classes(req, res);
});

module.exports = router;
