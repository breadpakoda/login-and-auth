const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const jwt = require("jsonwebtoken")
const authMiddleware = require("./authMiddleware")
require("dotenv").config()

const app = express()
app.use(express.json())
app.use(cors())

let db

// 🔌 DB Connection
async function startDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })
    console.log("✅ Database connected")
  } catch (err) {
    console.log("❌ Database connection failed:", err.message)
  }
}

startDB()

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  try {
    const { id, password } = req.body

    const [rows] = await db.execute(
      "SELECT name FROM aaa WHERE name=? AND password=?",
      [id, password]
    )

    if (rows.length === 0) {
      return res.status(401).json({ success: false })
    }

    const token = jwt.sign(
      { name: rows[0].name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.json({ success: true, token })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false })
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
    return res.status(500).json({ success: false })
  }
})

// 🚀 START SERVER
app.listen(process.env.PORT || 5000, () => {
  console.log("✅ Server running")
})
