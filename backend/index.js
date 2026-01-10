const express=require("express");
const cors=require("cors");
const mysql=require("mysql2/promise");

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



app.post("/user",async(req,res)=>{
    const id=req.body.id;
    const password=req.body.password;

    // console.log(id)
    // console.log(password)

const [rows] = await db.execute("select password from aaa where name=?",[id]);

if(rows.length>0 && rows[0].password===password){
    console.log("Success");
    res.json({
        success:true
    })
}

else{
    console.log("Failed");
    res.json({
        success:false
    })
}
   



})

app.listen(5000,()=>{
    console.log("server started...")
})



