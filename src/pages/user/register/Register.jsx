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
import Loader from "../../../components/user/loader/Loader";
import usePost from "../../../customHook/usePost";


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
    const { response, isLoading, error } = usePost(
      `${import.meta.env.VITE_BURL}/auth/signup`,
      value
    );
    console.log(response);

    if (isLoading) {
      return <Loader />;
    }

    // Handle error state
    if (error) {
      return <div>Error: {error}</div>;
    }
  };

  // to create a registration form with validation and submission to the server
  return (
    <>
      <Container className="mt-5">
        <h1 className="mb-4 ">Create Account</h1>
        <p className="my-3">Your Personal Details</p>
        <div className="separator"></div>
        {/* {serverError ? (<div className="text-danger fw-bold" > {serverError}</div>) : null} */}

        <Form onSubmit={handleSubmit(registerUser)}>
          <Form.Group controlId="formUserName" className="mb-3">
            <Form.Label className="col-sm-2">Username</Form.Label>
            <Form.Control
              className="col-sm-10"
              type="text"
              placeholder="Enter your username"
              {...register("userName", { required: "Username is required" })}
            />
            {errors.userName ? (
              <div className="text-danger">{errors.userName.message}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label className="col-sm-2">Email</Form.Label>
            <Form.Control
              type="email"
              className="col-sm-10"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email ? (
              <div className="text-danger">{errors.email.message}</div>
            ) : null}
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label className="col-sm-2">Password</Form.Label>
            <Form.Control
              type="password"
              className="col-sm-10"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password ? (
              <div className="text-danger">{errors.password.message}</div>
            ) : null}
          </Form.Group>

          <Button variant="secondary" type="submit">
            Create Account
          </Button>
        </Form>
      </Container>
    </>
  );
}
