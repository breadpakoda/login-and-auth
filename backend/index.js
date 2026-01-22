const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const jwt = require("jsonwebtoken")
const authMiddleware = require("./authMiddleware")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

let db;

async function startDB() {
  try {
    db = await mysql.createConnection({
       host: process.env.MYSQLHOST,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQLPASSWORD,
      database: process.env.MYSQLDATABASE,
      port: process.env.MYSQLPORT,
      ssl: {
        rejectUnauthorized: false // Important for Railway
      }
    });

    console.log("✅ MySQL connected");
  } catch (err) {
    console.log("❌ DB error:", err.message);
  }
}

startDB();

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body

    const [rows] = await db.execute(
      "SELECT name FROM aaa WHERE name=? AND password=?",
      [id, password]
    )

    if (rows.length === 0) {
      return res.json({ success: false })
    }

    const token = jwt.sign(
      { name: rows[0].name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.json({ success: true, token })
  } catch (err) {
    console.log(err)
    return res.json({ success: false })
  }
})

// 🔒 PROTECTED DASHBOARD
app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ name: req.user.name })
})

// 🆕 CREATE ACCOUNT
app.post("/create", async (req, res) => {
  try {
    const { name, password } = req.body

    const [rows] = await db.execute(
      "SELECT name FROM aaa WHERE name=?",
      [name]
    )

    if (rows.length > 0) {
      return res.json({
        success: false,
        message: "User already exists"
      })
    }

    await db.execute(
      "INSERT INTO aaa (name, password) VALUES (?, ?)",
      [name, password]
    )

    return res.json({
      success: true,
      message: "Account created successfully"
    })
  } catch (err) {
    console.log(err)
    return res.json({ success: false })
  }
})

// 🚀 START SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server running")
})
