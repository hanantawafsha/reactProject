import React from 'react'
import CustomNavbar from '../components/user/navbar/Navbar'
import UserNavbar from '../components/user/navbar/UserNavbar'

import { Outlet } from'react-router-dom'
export default function UserLayout() {
  return (
    <>
        <CustomNavbar/>
        <UserNavbar/>

        <Outlet/>

    </>
  )
}
