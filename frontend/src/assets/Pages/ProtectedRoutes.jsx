import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes({children}) {
    const isAuthenticated=false;
    const navigate=useNavigate();

    useEffect(()=>{
        if(!isAuthenticated) {
          navigate("/");
        }
    },[])


  return (
    children
  )
}

export default ProtectedRoutes
