import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Main() {

    const [id,setid]=useState("");
    const [password,setpassword]=useState("");
    const [success,setsuccess]=useState(false);
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
        const response=await axios.post("http://localhost:5000/user",{
            id:id,
            password:password
        })

        if(response.data.success){
          setsuccess(true)
          navigate("/dashboard")
          
        }
      
      }

        catch(error){
            console.log(error)
        }


    }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <form onSubmit={handleSubmit} className="border rounded p-5">
            <div>
                <label>Id</label>
                <input className="form-control" required placeholder='Enter the id....' onChange={(e)=>setid(e.target.value)}></input>
            </div>
            <div>
                <label>Password</label>
                <input className="form-control"required  placeholder="Enter the password...."  onChange={(e)=>setpassword(e.target.value)} type="password"></input>
            </div>
            <button className="btn btn-info mt-3 " type="submit">Login</button>
            {success && <p className='text-success mt-2 border p-1 rounded'>Logged in successfully</p>}
        </form>
        
      </div>
    </div>
  )
}

export default Main
