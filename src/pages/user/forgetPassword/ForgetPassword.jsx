import React from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { toast, Bounce } from'react-toastify';

export default function ForgetPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [serverError, setServerError] = React.useState(null);
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate();

  const resetPassword = async (value) => {
    const sendCodeURL = `${import.meta.env.VITE_BURL}/auth/forgotPassword`;

    try {
      const response = await axios.patch(sendCodeURL,value );
      if (!response.data.success) {
        toast.success("Password reset successful. You can now login with your new password.", {
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
        setMessage('Password reset successful. You can now login with your new password.');
        setServerError(null);
        navigate('/account/login');      
    }
     
    } catch (error) {
      console.error(error);
      setServerError('Failed to reset the password. Please check your details.');
      setMessage('');
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
            <p>Please enter your email, new password and code to setup and new password.</p>

            {serverError && <div className="text-danger fw-bold">{serverError}</div>}
            {message && <div className="text-success fw-bold">{message}</div>}

            <Form onSubmit={handleSubmit(resetPassword)}>
              <Form.Group className="mb-3" controlId="emailInput">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', { required: 'Email is required', pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i })}
                />
                {errors.email && <div className="text-danger">{errors.email.message || 'Invalid email format'}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="passwordInput">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your new password"
                  {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <div className="text-danger">{errors.password.message}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="codeInput">
                <Form.Label>Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter the code sent to your email"
                  {...register('code', { required: 'Code is required' })}
                />
                {errors.code && <div className="text-danger">{errors.code.message}</div>}
              </Form.Group>

              <Button variant="primary" type="submit">
                Reset Password
              </Button>
              <Button as={Link} to="/account/login" variant="secondary" className="mx-2">
                Back to Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
