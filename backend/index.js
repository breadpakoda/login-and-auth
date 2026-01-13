const express=require("express");
const cors=require("cors");
const mysql=require("mysql2/promise");
const jwt=require("jsonwebtoken")

const app= express();
app.use(express.json());
app.use(cors());
let db;


async function startDB(){
    db=await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"12345",
        database:"crud"
    })

    console.log("Database server started....")
}

startDB();



app.post("/login",async(req,res)=>{
    const id=req.body.id;
    const password=req.body.password;

    // console.log(id)
    // console.log(password)

const [rows] = await db.execute("select name from aaa where name=? and password=?",[id,password]);

if(rows.length===0 ){  
    return res.status(401).json({success:false})
}

const token=jwt.sign({name:rows[0].name},
    "JWT_SECRET",
    {expiresIn:"1h"}
)
console.log(rows[0].name)
return res.json({success:true})

   



})



app.listen(5000,()=>{
    console.log("server started...")
})



