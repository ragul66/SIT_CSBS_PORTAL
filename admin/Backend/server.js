const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const dbadmin = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin",
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
