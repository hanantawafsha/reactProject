import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../components/user/navbar/UserNavbar'

export default function AuthLayout() {
  return (
    <>
    <UserNavbar/>

    <Outlet/>   
    </>
  )
}
