import React from 'react'
import {jwtDecode} from "jwt-decode"

function Dashboard() {
  const token=localStorage.getItem("token")
  const decoded=jwtDecode(token)
  
  return (
    <div>
      Hello ,{decoded.name}
    </div>
  )
}

export default Dashboard
