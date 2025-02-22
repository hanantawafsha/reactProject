import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const token = localStorage.getItem('token');
   // const navigate = useNavigate();
    if (!token) {
      return <Navigate to ='/account/login'/>
    }

  return children
}
