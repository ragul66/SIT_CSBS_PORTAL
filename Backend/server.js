const mysql = require("mysql");
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sit_student",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting with database", err);
    return;
  }
  console.log("Connected to the MYSQL database");
});

//get all the logins details from the registeration table
app.get("/login", (req, res) => {
  const getlogin = "SELECT * FROM registration";
  db.query(getlogin, (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

//get a particular details by passing a ID
app.get("/login/:id", (req, res) => {
  const { id } = req.params; // Extract the ID from request parameters
  const login = "SELECT * FROM registration WHERE id=?";
  db.query(login, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (results.length === 0) {
      return res.status(404).send("Registration not found");
    }
    res.json(results[0]); // Return the first result as we expect only one record for a specific ID
  });
});

// // Register a new student into database
app.post("/register", (req, res) => {
  const {
    Name,
    RollNo,
    RegisterationNo,
    Emailid,
    password,
    Confirm_password,
    Batch,
    year,
    Ph_No,
  } = req.body;

  // Validate that password and Confirm_password are the same
  if (password !== Confirm_password) {
    return res.status(400).send("Passwords do not match.");
  }

  // Validate that Emailid ends with '@gmail.com'
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(Emailid)) {
    return res.status(400).send("Email must be a valid Gmail address.");
  }

  const sql =
    "INSERT INTO registration (Name, RollNo, RegisterationNo, Emailid, password, Confirm_password, Batch, year, Ph_No) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      Name,
      RollNo,
      RegisterationNo,
      Emailid,
      password,
      Confirm_password,
      Batch,
      year,
      Ph_No,
    ],
    (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ id: results.insertId, Name, RollNo, RegisterationNo });
    }
  );
});

//Update a Account details to the main table
app.put("/register/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    RollNo,
    RegisterationNo,
    Emailid,
    password,
    Confirm_password,
    Batch,
    year,
    Ph_No,
  } = req.body;

  // Validate that password and Confirm_password are the same
  if (password !== Confirm_password) {
    return res.status(400).send("Passwords do not match.");
  }

  // Validate that Emailid ends with '@gmail.com'
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(Emailid)) {
    return res.status(400).send("Email must be a valid Gmail address.");
  }

  const sql =
    "UPDATE registration SET name=?, RollNo=?, RegisterationNo=?, Emailid=?, password=?, Confirm_password=?,Batch=?,year=?,Ph_No=? WHERE id=?";

  db.query(
    sql,
    [
      name,
      RollNo,
      RegisterationNo,
      Emailid,
      password,
      Confirm_password,
      Batch,
      year,
      Ph_No,
      id,
    ], // Add 'id' at the end to match the WHERE clause
    (err, results) => {
      if (err) {
        return res.status(500).send(err); // Corrected the comma to a dot here
      }
      res.json({ message: `Student ${id} updated Successfully` });
    }
  );
});

//Delete the student data from the admin side
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM registration WHERE id=?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ message: `Student ${id} deleted Successfully` });
  });
});

// Admin Panel Backend Started
// Admin panel Registeration
app.post("/adregister", (req, res) => {
  const {
    name,
    staffid,
    emailid,
    password,
    confirmpassword,
    designation,
    Ph_No,
  } = req.body;

  // Validate that password and confirmPassword are the same
  if (password !== confirmpassword) {
    return res.status(400).send("Passwords do not match.");
  }

  // Validate that EmailId ends with '@gmail.com'
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  // if (!emailRegex.test(emailid)) {
  //   return res.status(400).send("Email must be a valid Gmail address.");
  // }

  const query = `
    INSERT INTO admin (name, staffid, emailid, password, confirmpassword, designation, Ph_No)
    VALUES (?, ?, ?, ?, ?, ?,?)
  `;
  db.query(
    query,
    [name, staffid, emailid, password, confirmpassword, designation, Ph_No],
    (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send("Registration successful");
      }
    }
  );
});

// // Ensure uploads directory exists
// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer setup for storing files in the 'uploads' directory
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage: storage });

// // Register route with image upload
// app.post("/adregister", upload.single("image"), (req, res) => {
//   const {
//     name,
//     staffid,
//     emailid,
//     password,
//     confirmpassword,
//     designation,
//     Ph_No,
//   } = req.body;

//   // Validate that password and Confirm_password are the same
//   if (password !== confirmpassword) {
//     return res.status(400).send("Passwords do not match.");
//   }

//   // Validate that Emailid ends with '@gmail.com'
//   const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//   if (!emailRegex.test(emailid)) {
//     return res.status(400).send("Email must be a valid Gmail address.");
//   }

//   const imagePath = req.file ? req.file.path : null;

//   const sql = `
//     INSERT INTO registration (name, staffid, emailid, password, confirmpassword, designation, Ph_No, image)
//     VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//   `;
//   db.query(
//     sql,
//     [
//       name,
//       staffid,
//       emailid,
//       password,
//       confirmpassword,
//       designation,
//       Ph_No,
//       imagePath,
//     ],
//     (err, results) => {
//       if (err) {
//         return res.status(500).send(err);
//       }
//       res.send("Registration successful");
//     }
//   );
// });

// // Make the 'uploads' directory publicly accessible
// app.use("/uploads", express.static("uploads"));

app.get("/adlogin", (req, res) => {
  const getLogin = "SELECT staffid, password FROM admin";
  db.query(getLogin, (err, results) => {
    if (err) {
      return res.status(500).send({ error: "Database query error" });
    }
    res.json(results);
  });
});

//Admin side panel year wise filteration
app.get("/data/:Batch", (req, res) => {
  const { Batch } = req.params;
  const query = "SELECT * FROM registration WHERE Batch=?";
  db.query(query, [Batch], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json(results);
  });
});

//Updating a student data and deleting the data from the admin side
app.delete("/data/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM registration WHERE id=?";
  db.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ message: "Deleted successfully" });
  });
});

app.put("/data/:id", (req, res) => {
  const { id } = req.params;
  const { Name, RollNo, RegisterationNo, Emailid, Batch, year, Ph_No } =
    req.body;
  const query = `
    UPDATE registration 
    SET Name=?, RollNo=?, RegisterationNo=?, Emailid=?, Batch=?, year=?, Ph_No=? 
    WHERE id=?`;
  db.query(
    query,
    [Name, RollNo, RegisterationNo, Emailid, Batch, year, Ph_No, id],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      res.json({ message: "Updated successfully" });
    }
  );
});
//server is running on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});
