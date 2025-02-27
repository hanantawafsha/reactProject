import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Image from'react-bootstrap/Image';
import { Link, useNavigate } from'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { UserContext } from '../context/UserContext';


export default function CustomNavbar() {
   //cartCount
  //CartContext
  const navigate = useNavigate();
  const {cartCount} = useContext(CartContext);
  const {user,loading,setUser} = useContext(UserContext);
  console.log(user);
 //setUser(user);
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/account/login")
  }
 
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">User eCommerce Website React</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Profile dropdown */}
            <Dropdown>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        Account {loading? "..." : user?.userName} 
        <Image 
                  src={user?.image?.secure_url} 
                  alt="ImageProfile"
                  roundedCircle 
                  className="ms-2"
                  width={30}
                  height={30}
                />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to={'/account/login'}>Login</Dropdown.Item>
        <Dropdown.Item as={Link} to={'/account/register'}>Rigester</Dropdown.Item>
        <Dropdown.Item as={Link} to={'/account/profile/info'}>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} onClick={logout}>Logout</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
            <Nav.Link as={Link} to={'/account/cart'}>Cart {cartCount}</Nav.Link>
            
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}


