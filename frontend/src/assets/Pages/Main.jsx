import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom"

function Main() {

  const [id, setid] = useState("");
  const [password, setpassword] = useState("");
  const [success, setsuccess] = useState(false);
  const [message,setmessage]=useState("");
  const navigate = useNavigate();
  const redirectCreate=(e)=>{
    navigate("/create")
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        id: id,
        password: password
      })

      if (response.data.success) {  
        localStorage.setItem("token",response.data.token)
        navigate("/dashboard")
        setsuccess(true)
      }
      else{
        // alert("Invalid credentials")
        setmessage("Invalid credentials")
      }

    }

    catch (error) {
      console.log(error)
    }


  }
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">
    <div className="border rounded p-5">
        <form onSubmit={handleSubmit} >
          <div>
            <label>Id</label>
            <input className="form-control" required placeholder='Enter the id....' onChange={(e) => setid(e.target.value)}></input>
          </div>
          <div>
            <label>Password</label>
            <input className="form-control" required placeholder="Enter the password...." onChange={(e) => setpassword(e.target.value)} type="password"></input>
          </div>
          <button className="btn btn-info mt-3 " type="submit">Login</button>
          {success && <p className='text-success mt-2 border p-1 rounded'>Logged in successfully</p>}
          <p className='text-danger'>{message}</p>

         

        </form>
        <div className=" mt-4">
          
        <button onClick={redirectCreate} className="btn btn-primary">Create account</button>
        </div>
        

      </div>
      </div>
    </div>
  )
}

export default Main
