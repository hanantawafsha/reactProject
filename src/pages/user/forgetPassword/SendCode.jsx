import React, { useState } from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast, Bounce } from "react-toastify";

export default function SendCode() {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const sendCode = async (e) => {
    e.preventDefault();
    try {
        setIsLoading(true);
        //https://ecommerce-node4.onrender.com/auth/sendcode
      const url = `${import.meta.env.VITE_BURL}/auth/sendcode`;
      const response = await axios.patch(url, { email: email});
      if (response.status){
        toast.success("We have sent you an email with a link to update your password.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
        setMessage('We have sent you an email with a link to update your password.');
        setServerError(null);
        navigate("/account/resetpassword");
      }
     

    } catch (error) {
      console.error(error);
      setServerError('Failed to send the code. Please try again.');
      setMessage('');
    }
    finally{
        setIsLoading(false);
        
    }

  };

  return (
    <>
      <Container className="mt-5">
        <h1 className="mb-4">Account</h1>
        <Row className="d-flex justify-content-between">
          <Col md={6} className="signBparder">
            <h2>New Customer</h2>
            <p className="text-bold">Register Account</p>
            <p>
              By creating an account you will be able to shop faster, be up to
              date on an order's status, and keep track of the orders you have
              previously made.
            </p>
            <Link to="/account/register" className="text-decoration-none">
              <Button variant="secondary" size="md">
                Create an account
              </Button>
            </Link>
          </Col>

          <Col md={6} className="signBparder">
            <h2>Returning Customer</h2>
            <p>I am a returning customer</p>
            <h3> Reset your password</h3>
<p>We will send you an email to reset your password.</p>

            {serverError && <div className="text-danger fw-bold">{serverError}</div>}
            {message && <div className="text-success fw-bold">{message}</div>}

            <Form onSubmit={sendCode}>
              <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Send Code
              </Button>
              <Button as={Link} to="/account/login" variant="secondary" className='mx-2'> Back to Login</Button>

              
            </Form>
            
          </Col>
        </Row>
      </Container>
    </>
  );
}
