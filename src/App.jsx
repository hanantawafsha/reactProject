import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CustomNavbar from './components/user/navbar/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import Register from './pages/user/register/Register'
import Login from './pages/user/login/Login'
import DashboardLayout from './layout/DashboardLayout'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import UserLayout from './layout/UserLayout'
import Categories from './pages/user/category/Categories'
import Products from './pages/user/product/Products'
import CategoryProducts from './pages/user/category/CategoryProducts'
import ProductDetails from './pages/user/product/ProductDetails'


function App() {
const router = createBrowserRouter([
  { path: '/account', 
    element: <AuthLayout/>,
    children: [
      { path: 'register', element: <Register/> },
      { path: 'login', element: <Login/> },
    ],

  },
  { path: '/', 
    element: <UserLayout/>,
    children: [
      { path: 'categories', element: <Categories/> },
      { path: 'products', element: <Products/> },
      
      // Add more routes here for other pages like dashboard, cart, checkout, etc.
      ///products/
      { path: 'products/:categoryID', element: <CategoryProducts/> },
      { path: 'product/:productID', element: <ProductDetails/> },



    ],

  },
  { path: '/dashbord', element: <DashboardLayout/>},
  { path: '*', element: <h1>Page not found</h1> }, // Default route if none of the above match
])
  return (
    <>
    <ToastContainer />
     <RouterProvider router={router} />
    </>
  )
}

export default App
