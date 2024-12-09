const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",  // Your MySQL username
  password: "",  // Your MySQL password
  database: "customer_management"
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database");
});

// CRUD API endpoints
app.get("/customers", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).send("Database error");
    res.json(results);
  });
});

app.post("/customers", (req, res) => {
  const { name, age, department } = req.body;
  const sql = "INSERT INTO customers (name, age, department) VALUES (?, ?, ?)";
  db.query(sql, [name, age, department], (err) => {
    if (err) return res.status(500).send("Database error");
    res.status(201).send("Customer added");
  });
});

app.put("/customers/:id", (req, res) => {
  const { name, age, department } = req.body;
  const { id } = req.params;
  const sql = "UPDATE customers SET name = ?, age = ?, department = ? WHERE id = ?";
  db.query(sql, [name, age, department, id], (err) => {
    if (err) return res.status(500).send("Database error");
    res.send("Customer updated");
  });
});

app.delete("/customers/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM customers WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).send("Database error");
    res.send("Customer deleted");
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
