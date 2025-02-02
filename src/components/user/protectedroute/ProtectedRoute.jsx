import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    if (!token) {
      return <h1>Please Login</h1>
      navigate('/account/login');
    }

  return (
    <div>ProtectedRoute</div>
  )
}
