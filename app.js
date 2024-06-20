const express = require("express");
const PORT = process.env.PORT || 2222;
const bodyParser = require("body-parser");

const app = express();

app.get("/", (req, res) => {
  res.send("School Management System");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());


const server = app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
