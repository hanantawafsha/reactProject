import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { FiUser, FiShoppingCart, FiImage, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import style from './sidebar.module.css';
import {Row,Col} from "react-bootstrap";


export default function CustomSidebar() {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <Sidebar className={style.sidebar} collapsed={menuCollapse}>
      <Row onClick={menuIconClick} >
        
        <p className="flex-space" >{menuCollapse ? "Profile" : "Big Profile" } {menuCollapse ? <FiArrowRightCircle  /> : <FiArrowLeftCircle className='ms-5'/>}</p>
        
       
        
      </Row>
      <Menu
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#13395e',
              color: '#b6c8d9',
            },
          },
        }}
      >
        <MenuItem component={<Link to="/account/profile/info" />} icon={<FiUser />}> Info</MenuItem>
        <MenuItem component={<Link to="/account/profile/orders" />} icon={<FiShoppingCart />}> Orders</MenuItem>
        <MenuItem component={<Link to="/account/profile/image" />} icon={<FiImage />}> Image</MenuItem>
      </Menu>
    </Sidebar>
  );
}
