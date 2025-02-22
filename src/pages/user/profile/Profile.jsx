import React from 'react';
import CustomSidebar from '../sidebar/CustomSidebar';
import { Outlet } from 'react-router-dom';

import Container from'react-bootstrap/Container';
import Row from'react-bootstrap/Row';
import Col from'react-bootstrap/Col';


export default function Profile() {
  return (
<>
<Container fluid>
  <Row>
    <Col md={2}>
      <CustomSidebar />
    </Col>
    <Col md={8}>
      <h1>Profile</h1>
      <Outlet />
    </Col>
  </Row>
 
</Container>
<Outlet/>


</>  
)
}
