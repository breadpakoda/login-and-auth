const express = require("express")
const cors = require("cors")
const mysql = require("mysql2/promise")
const jwt = require("jsonwebtoken")
const authMiddleware = require("./authMiddleware")

const JWT_SECRET = "my_learning_secret_key"

const app = express()
app.use(express.json())
app.use(cors())

let db

async function startDB() {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "crud"
  })
  console.log("Database server started....")
}
startDB()

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
      JWT_SECRET,
      { expiresIn: "1h" }
    )

    return res.json({ success: true, token })
  } catch (err) {
    return res.status(500).json({ success: false })
  }
})

app.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ name: req.user.name })
})

app.post("/create",async(req,res)=>{
  const{name , password}=req.body;
  const [rows]=await db.execute("select name from aaa where name=?",[name]);
  if(rows.length===0){
    await db.execute("insert into aaa values (?,?)",[name,password]);

    return res.json({
      success:true,
      message:"Account created successfully"
    })
  }
  else{
    return res.json({
      success:false,
      message:"user already exists"
    })
  }

  
  


})








app.listen(5000, () => {
  console.log("server started...")
})
