import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

//import useFetch from "../../hooks/useFetch";  // import custom hook useFetch
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../customHook/useFetch"; 
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(false);
 const [serverError, setserverError] = useState("");
    
  const loginUser = async (value) => {
      // use UseFetch to post login 
  const url = `${import.meta.env.VITE_BURL}/auth/signin`;
    //   const {response, error, isLoading} =  useFetch(url);  // use UseFetch to post login
    try {
      const response = await axios.post(url, value);
      setIsLoading(false);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("User Signed successfully!", {
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
        navigate("/");
      }
    } catch (error) {
      setserverError(error.message);
    }
    finally{
      setIsLoading(false);
    }

     
  };

  // to create a registration form with validation and submission to the server
  return (
    <>
      <Container className="mt-5">
        <h1 className="mb-4 ">Account</h1>
        <Row className="d-flex justify-content-between ">
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
            {serverError ? (
              <div className="text-danger fw-bold"> {serverError}</div>
            ) : null}

            <Form onSubmit={handleSubmit(loginUser)}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email ? (
                  <div className="text-danger">{errors.email.message}</div>
                ) : null}
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password ? (
                  <div className="text-danger">{errors.password.message}</div>
                ) : null}
              </FloatingLabel>
              <Button
                type="submit"
                className="my-3"
                variant="secondary"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
