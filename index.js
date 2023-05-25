import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chicken@396",
  database: "gym1",
  port: 3306,
});
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Use your email service provider
//   auth: {
//     user: 'rnimkar508@gmail.com', // Replace with your email address
//     pass: 'Chicken@396' // Replace with your email password or an app-specific password
//   }
// });
// const mailOptions = {
//   from: 'rnimkar508@gmail.com', // Replace with your email address
//   to: 'recipient@example.com', // Replace with the recipient's email address
//   subject: 'Hello from Node.js',
//   text: 'This is a test email sent from Node.js.'
// };

// // Send the email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });


const query =
  "CREATE TABLE IF NOT EXISTS request( id int auto_increment,fullname varchar(255), email varchar(255), price varchar(255),phonenumber varchar(255), dob varchar(255),fromdate varchar(255) ,lastdate varchar(255),gender varchar(255),timeSlot varchar(255),isApproved bool,primary key(id));";
db.query(query);
const userQuery =
  "CREATE TABLE IF NOT EXISTS users( id int auto_increment, username varchar(255),age varchar(255),password varchar(255),email varchar(255),price varchar(255),phonenumber varchar(255),dob varchar(255), gender varchar(255),timeSlot varchar(255),primary key(id));";
db.query(userQuery);
app.get("/", (req, res) => {
  res.json("hello");
});
app.post("/register", (req, res) => {
    const q = "INSERT INTO users(`username`, `email`, `password`,`gender`, `phonenumber`, `age`) VALUES (?)";
  
    const values = [req.body.username, req.body.email, req.body.password, req.body.gender,req.body.phoneNumber,req.body.age];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  app.get("/request/:email", (req, res) => {
    const email = req.params.email;
    const q = "SELECT * FROM request WHERE email = ? ";
  
    db.query(q, [email], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  app.post("/requestform", (req, res) => {
    const q = "INSERT INTO request(`fullName`, `email`, `price`, `phonenumber`, `dob`, `fromdate`, `lastdate`,`gender`, `timeSlot`,`isApproved`) VALUES (?)";
    console.log(req.body)
    const values = [req.body.fullName, req.body.email, req.body.price, req.body.phoneNumber, req.body.dob, req.body.fromDate, req.body.lastDate,req.body.gender, req.body.timeSlot,req.body.isApproved];
  
    db.query(q, [values], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
  app.get("/request", (req, res) => {
    const q = "SELECT * FROM request";
    db.query(q, (err, data) => {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      return res.json(data);
    });
  });
  app.delete('/delete/:id', (req, res) => {
    const requestId = req.params.id;
  
    // Query to delete the request from the database
    const deleteQuery = `DELETE FROM request WHERE id = ${requestId}`;
  
    // Execute the delete query
    db.query(deleteQuery, (error, result) => {
      if (error) {
        console.error('Error deleting request:', error);
        res.status(500).json({ error: 'An error occurred while deleting the request.' });
      } else {
        res.json({ message: 'Request deleted successfully.' });
      }
    });
  });
  app.post("/approve/:id", (req, res) => {
    const requestId = req.params.id;

    const q = "UPDATE request SET isApproved = true WHERE id = ?";
  
    db.query(q, [requestId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.post("/login", (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? ";
  
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });
app.listen(8080, () => {
    console.log("Connected to backend.");
  });
