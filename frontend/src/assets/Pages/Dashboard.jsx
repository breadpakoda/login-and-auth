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
    axios.get("http://localhost:5000/dashboard", {
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
      <h1>Welcome, {name}</h1>
    </div>
  )
}

export default Dashboard
