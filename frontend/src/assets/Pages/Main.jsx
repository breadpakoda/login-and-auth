import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Main() {

  const [id, setid] = useState("")
  const [password, setpassword] = useState("")
  const [message, setmessage] = useState("")

  const navigate = useNavigate()

  const redirectCreate = () => {
    navigate("/create")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        {
          id,
          password
        }
      )

      if (response.data.success) {
        localStorage.setItem("token", response.data.token)
        navigate("/dashboard")
      } else {
        setmessage("Invalid credentials")
      }

    } catch (error) {
      console.log(error)
      setmessage("Server error. Try again later.")
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100">

        <div className="border rounded p-5">

          <form onSubmit={handleSubmit}>

            <div>
              <label>Id</label>
              <input
                className="form-control"
                required
                placeholder="Enter id..."
                value={id}
                onChange={(e) => setid(e.target.value)}
              />
            </div>

            <div>
              <label>Password</label>
              <input
                className="form-control"
                required
                type="password"
                placeholder="Enter password..."
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <button className="btn btn-info mt-3" type="submit">
              Login
            </button>

            <p className="text-danger mt-2">{message}</p>

          </form>

          <div className="mt-4">
            <button
              onClick={redirectCreate}
              className="btn btn-primary"
            >
              Create account
            </button>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Main
