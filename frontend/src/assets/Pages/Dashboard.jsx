import React, { useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"

function Dashboard() {
  const [name, setName] = useState("")
  const token = localStorage.getItem("token")

  // No token → blocked
  if (!token) {
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setName(res.data.name)
      })
      .catch(() => {
        // token invalid / expired
        localStorage.removeItem("token")
      })
  }, [])

  

  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <div className="border ">Hello {name}</div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Dashboard
