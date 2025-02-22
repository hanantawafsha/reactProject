import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
export default function AuthProtectedRoute({children}) {
    const token = localStorage.getItem('token');
     if (token) {
       return <Navigate to ='/' />
     }
 
   return children 
}


