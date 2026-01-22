import React from 'react'
import axios from "axios";
import { useState } from 'react';

function Create() {
    const [name,setname] =useState("");
    const [password,setpassword]=useState("");
    const [message,setmessage]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
        const response=await axios.post(`${import.meta.env.VITE_API_URL}/create`,{
            name:name,
            password:password
        })
       
        if(response.data.success){
            setmessage("Account created successfully")
        }
        else{
            setmessage("User already exists")
        }
    }


catch(err){
    console.log(err)
}
    }

  return (
    <div>
        <div className=' d-flex vh-100 justify-content-center align-items-center  '>
            <form className='rounded border p-5' onSubmit={handleSubmit}>
                <div>
                    <label className=''>Name</label>
                    <input className='form-control' onChange={(e)=>{setname(e.target.value)}} required placeholder='Enter the name'></input>
                </div>
                <div>
                    <label>Password</label>
                    <input className='form-control' type="password" onChange={(e)=>{ setpassword(e.target.value)}} required placeholder='Enter the password'></input>
                </div>
                <button className='btn btn-info mt-3' type="submit">Submit</button>
                <p>{message}</p>
            </form>
            
        </div>
    </div>
  )
}

export default Create
