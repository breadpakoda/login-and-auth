import React from 'react'
import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


function Create() {
    const [name, setname] = useState("");
    const [user_name, setuser_name] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [message, setmessage] = useState("");
    const navigate = useNavigate();


    const redirectMain = () => { navigate("/") }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/create`, {
                user_name: user_name,
                name:name,
                email:email,
                password:password,
            })

            if (response.data.success) {
                setmessage("Account created successfully")
            }
            else {
                setmessage("User already exists")
            }
        }


        catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <div className=' d-flex vh-100 justify-content-center align-items-center  '>
                <div className='rounded border p-5'>
                    <form onSubmit={handleSubmit}>
                        <h1 className='display-4 '>Create account</h1>
                        <div>
                            <label className=''>Name</label>
                            <input className='form-control' onChange={(e) => { setname(e.target.value) }} required placeholder='Enter the name'></input>
                        </div>
                        <div>
                            <label>Create a user name</label>
                            <input className='form-control' placeholder="Enter the name " type='text' onChange={(e)=>setuser_name(e.target.value)} required></input>
                        </div>
                        <div>
                            <label>Email</label>
                            <input className='form-control' placeholder="Enter your email address " type="email" onChange={(e)=>{setemail(e.target.value)}} required></input>
                        </div>
                        <div>
                            <label>Password</label>
                            <input className='form-control' type="password" onChange={(e) => { setpassword(e.target.value) }} required placeholder='Enter the password'></input>
                        </div>

                        <button className='btn btn-info mt-3' type="submit">Done</button>
                        <p>{message}</p>
                    </form>
                    <button className="btn btn-primary" onClick={redirectMain} >Already have a account</button>
                </div>


            </div>
        </div>
    )
}

export default Create
