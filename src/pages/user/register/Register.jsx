import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setserverError] = useState("");

  const registerUser = async (value) => {
    setIsLoading(true);
    try {
        
      const response = await axios.post(
        `${import.meta.env.VITE_BURL}/auth/signup`,
        value
      );

      if (response.status === 201) {
        toast.success(
          "User registered successfully! Please check your email to confirm your registration.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        navigate("/login");
      } 
    } catch (error) {
      //console.error(error);
      setserverError(error.response.data.message);
      toast.error(
        error.response.data.message,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

    // to create a registration form with validation and submission to the server
  return (
    <>
   

      
      <Container className="mt-5">
          <h1 className="mb-4 ">Create Account</h1>
        <p className="my-3">Your Personal Details</p>
        <div className="separator"></div>
        {serverError ? (<div className="text-danger fw-bold" > {serverError}</div>) : null}
        
          <Form onSubmit={handleSubmit(registerUser)}>
            

            <Form.Group  controlId="formUserName" className="mb-3">
              <Form.Label className="col-sm-2">Username</Form.Label>
              <Form.Control className="col-sm-10"
                type="text"
                placeholder="Enter your username"
                {...register('userName', { required: 'Username is required' })}
              />
              {errors.userName? (
              <div className="text-danger">{errors.userName.message}</div>
            ) : null}
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label  className="col-sm-2">Email</Form.Label>
              <Form.Control
                type="email"
                className="col-sm-10"
                placeholder="Enter your email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
             {errors.email? (
              <div className="text-danger">{errors.email.message}</div>
            ) : null}
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label  className="col-sm-2">Password</Form.Label>
              <Form.Control
                type="password"
                 className="col-sm-10"
                placeholder="Enter your password"
                {...register('password', {
                  required: 'Password is required',
                  
                })}
              />
             {errors.password? (
              <div className="text-danger">{errors.password.message}</div>
            ) : null}
            </Form.Group>

            <Button variant="secondary" type="submit">
            {isLoading ? "Creating ..." : "Create Account"}
            </Button>
          </Form>
    </Container>
    </>
  );
}
