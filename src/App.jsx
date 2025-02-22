import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import CustomNavbar from "./components/user/navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Register from "./pages/user/register/Register";
import Login from "./pages/user/login/Login";
import DashboardLayout from "./layout/DashboardLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserLayout from "./layout/UserLayout";
import Categories from "./pages/user/category/Categories";
import Products from "./pages/user/product/Products";
import CategoryProducts from "./pages/user/category/CategoryProducts";
import ProductDetails from "./pages/user/product/ProductDetails";
import Cart from "./pages/user/cart/Cart";
import ProtectedRoute from "./components/user/protectedroute/ProtectedRoute";
import CartContextProvider from "./components/user/context/CartContext";
import Profile from "./pages/user/profile/Profile";
import Info from "./pages/user/profile/Info";
import Orders from "./pages/user/profile/Orders";
import UserContextProvider from "./components/user/context/UserContext";
import AuthProtectedRoute from "./components/user/protectedroute/AuthProtectedRoute";
import Logout from "./pages/user/logout/Logout";
import UserImage from "./pages/user/profile/Image";
import PlaceOrder from "./pages/user/cart/PlaceOrder";
import SendCode from "./pages/user/forgetPassword/SendCode";
import ForgetPassword from "./pages/user/forgetPassword/ForgetPassword";
import Home from "./pages/Home/home";


function App() {
  const router = createBrowserRouter([
    {
      path: "/account",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: (
            <AuthProtectedRoute>
              <Register />
            </AuthProtectedRoute>
          ),
        },
        { path: "login", element: (
          <AuthProtectedRoute>
            <Login />
          </AuthProtectedRoute>
        ),
        
       },
       { path: "sendcode", element: (
        <AuthProtectedRoute>
          <SendCode />
        </AuthProtectedRoute>
      ),

     },
     { path: "resetpassword", element: (
      <AuthProtectedRoute>
        <ForgetPassword />
      </AuthProtectedRoute>
    ),

   },
        { path: "cart", element: (
          <ProtectedRoute>
                <CustomNavbar/>
            <Cart />
          </ProtectedRoute>
        ),
       },
        { path: "placeorder", element: 
          <PlaceOrder />
     },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
                  <CustomNavbar/>

          <Profile />
          </ProtectedRoute>),
          children: [
            { path: "info", element: <Info /> },
            { path: "orders", element: <Orders />, 
             
            },
            { path: "image", element: <UserImage /> },
          ],
        },
       
      ],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home/> }, // Home page route
        { path: "categories", element: <Categories /> },
        { path: "products", element: <Products /> },

        // Add more routes here for other pages like dashboard, cart, checkout, etc.
        ///products/
        { path: "products/:categoryID", element: <CategoryProducts /> },
        { path: "product/:productID", element: <ProductDetails /> },
      ],
    },
    { path: "/dashbord", element: <DashboardLayout /> },
    { path: "*", element: <h1>Page not found</h1> }, // Default route if none of the above match
  ]);
  return (
    <>
      <UserContextProvider>
        <CartContextProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </CartContextProvider>
      </UserContextProvider>
    </>
  );
}

export default App;
