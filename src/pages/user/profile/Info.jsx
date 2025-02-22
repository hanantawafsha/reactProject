import React from 'react'
import { UserContext } from '../../../components/user/context/UserContext'
import { useContext } from 'react';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import Loader from '../../../components/user/loader/Loader';

export default function Info() {
  const {user,loading} = useContext(UserContext);
  if (loading) {
    return <Loader />
  }
  return (
<>
<Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-3 text-center">
            <Image
              src={user.image.secure_url}
              alt="Profile"
              roundedCircle
              className="mx-auto d-block mb-3"
            />
            <Card.Body>
              <Card.Title className="fw-bold">{user.userName}</Card.Title>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Status: <span className="fw-semibold">{user.status}</span></Card.Text>
              <Card.Text>Role: <span className="fw-semibold">{user.role}</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
</>
  )
}
