import React from 'react'
import Main from "./assets/Pages/Main.jsx"
import Dashboard from './assets/Pages/Dashboard.jsx'
import {BrowserRouter , Routes , Route} from "react-router-dom"
import ProtectedRoutes from './assets/Pages/ProtectedRoutes.jsx'


function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Main/>}/>
    <Route path="/dashboard" element={
      <ProtectedRoutes>
        <Dashboard/>
      </ProtectedRoutes>
    }/>
  </Routes>
  </BrowserRouter>
      
    
  )
}

export default App
