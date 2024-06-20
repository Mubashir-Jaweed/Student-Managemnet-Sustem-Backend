const { get_all_teacher, create_teacher, get_teacher_by_id, update_teacher, delete_teacher, search_teachers } = require('../controllers/teacherController');

const router = require('express').Router();


router.get('/teachers', async (req,res)=>{
    get_all_teacher(req,res)
});

router.post('/teacher', async (req,res)=>{
    create_teacher(req,res)
});

router.post('/teacher/:teacherId', async (req,res)=>{
    get_teacher_by_id(req, res);
});

router.put('/teacher/:teacherId', async (req,res)=>{
    update_teacher(req, res);
});

router.delete('/teacher/:teacherId', async (req,res)=>{
    delete_teacher(req, res);
});

router.get('/teachers', async (req,res)=>{
    search_teachers(req, res);
});


 
module.exports = router;