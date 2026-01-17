import React from 'react'
import Main from "./assets/Pages/Main.jsx"
import Dashboard from './assets/Pages/Dashboard.jsx'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import ProtectedRoute from './assets/Pages/ProtectedRoute.jsx'
import Create from "./assets/Pages/Create.jsx"


function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Main/>}/>
    <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route path="/create" element={<Create/>}/>

  </Routes>
  </BrowserRouter>
      
    
  )
}

export default App
