const mysql = require("mysql2/promise")
require("dotenv").config()

async function test() {
  try {
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      connectTimeout: 10000
    })
    console.log("✅ DB connected successfully")
    process.exit(0)
  } catch (err) {
    console.error("❌ DB error:", err.message)
    process.exit(1)
  }
}

test()
