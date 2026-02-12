import React, { useEffect, useState } from "react"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useNavigate } from 'react-router-dom'




function Dashboard() {
  const [name, setName] = useState("")
  const token = localStorage.getItem("token")
  const [user_name,setuser_name]=useState("")
  const navigate=useNavigate();

  const redirectMain=()=>{navigate("/")};
  

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
        setName(res.data.name);
        setuser_name(res.data.user_name);
      })
      .catch(() => {
        // token invalid / expired
        localStorage.removeItem("token")
      })
  }, [])



  

  return (
     <div className="vh-100 d-flex">

      {/* ================= LEFT SIDEBAR ================= */}
      <div
        className="d-flex flex-column text-white p-3"
        style={{
          width: "260px",
          background: "linear-gradient(180deg, #1e3c72, #2a5298)"
        }}
      >
        {/* Profile */}
        <div className="d-flex align-items-center mb-4">
          <img
            src="https://i.ibb.co/ksf4MjdW/logo.png"
            alt="profile"
            className="rounded-circle me-2"
          />
          <div>
            <h6 className="mb-0">{name}</h6>
            <small>{user_name}</small>
          </div>
        </div>

        {/* Navigation */}
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <button className="nav-link text-white text-start active">
              Dashboard
            </button>
          </li>
          <li>
            <button className="nav-link text-white text-start">
              Messages
            </button>
          </li>
          <li>
            <button className="nav-link text-white text-start">
              Contacts
            </button>
          </li>
          <li>
            <button className="nav-link text-white text-start">
              Group Chat
            </button>
          </li>
          <li>
            <button className="nav-link text-white text-start">
              Settings
            </button>
          </li>
          <li>
            <button className="nav-link text-white text-start" onClick={redirectMain}>
              Logout
            </button>
          </li>
        </ul>

        {/* New Chat Button */}
        <button className="btn btn-success mt-auto">
          + New Chat
        </button>
      </div>

      {/* ================= CHAT LIST ================= */}
      <div className="border-end" style={{ width: "300px" }}>
        <div className="p-3 border-bottom">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
          />
        </div>

        {/* Chat Items */}
        <div className="list-group list-group-flush overflow-auto" style={{ height: "calc(100vh - 70px)" }}>
          
          {/* Single Chat Item */}
          <button className="list-group-item list-group-item-action">
            <div className="d-flex align-items-center">
              <img
                src="https://i.pravatar.cc/35"
                className="rounded-circle me-2"
                alt=""
              />
              <div>
                <div className="fw-bold">User</div>
                <small className="text-muted">
                  Last message preview...
                </small>
              </div>
            </div>
          </button>

          {/* Duplicate this block for more users */}

        </div>
      </div>

      {/* ================= MAIN CHAT AREA ================= */}
      <div className="flex-grow-1 d-flex flex-column">

        {/* Chat Header */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img
              src="https://i.pravatar.cc/40"
              className="rounded-circle me-2"
              alt=""
            />
            <div>
              <h6 className="mb-0">Future user</h6>
              <small className="text-success">Online</small>
            </div>
          </div>

          <div>
            <button className="btn btn-light btn-sm me-2">📞</button>
            <button className="btn btn-light btn-sm">🎥</button>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          className="flex-grow-1 p-4 overflow-auto"
          style={{ backgroundColor: "#f4f6f9" }}
        >
          {/* Received Message */}
          <div className="mb-3">
            <div className="bg-white p-3 rounded shadow-sm d-inline-block">
              Import note!!
            </div>
          </div>

          {/* Sent Message */}
          <div className="mb-2 text-end">
            <div className="bg-primary text-white p-3 rounded shadow-sm d-inline-block">
              These are just some sample hardcoded messages.
            </div>
          </div>

          <div className="mb-2 text-end">
            <div className="bg-primary text-white p-3 rounded shadow-sm d-inline-block">
              Just for the preview.
            </div>
          </div>

          <div className="mb-2 text-end">
            <div className="bg-primary text-white p-3 rounded shadow-sm d-inline-block">
              Made by Aditya.
            </div>
          </div>

          

        </div>

        {/* Message Input */}
        <div className="p-3 border-top d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Type a message..."
          />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
