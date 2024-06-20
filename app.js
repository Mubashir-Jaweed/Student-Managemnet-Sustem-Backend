const express = require("express");
const PORT = process.env.PORT || 2222;
const bodyParser = require("body-parser");
const connectDB = require("./config/database")
const classModel = require("./models/class")
const courseModel = require("./models/course")
const teacherModel = require("./models/teacher")
const studentModel = require("./models/student")
const markModel = require("./models/mark")

const classRoutes  =require('./routes/classRoutes')
const courseRoutes  =require('./routes/courseRoutes')
const teacherRoutes  =require('./routes/teacherRoutes')
const studentRoutes  =require('./routes/studentRoutes')
const markRoutes  =require('./routes/markRoutes')

const app = express();
connectDB()

app.get("/", (req, res) => {
  res.send("School Management System");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());


const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
