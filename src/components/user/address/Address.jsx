import React, { useContext, useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../context/CartContext";
const Address = () => {
  const [placeOrder, setPlaceOrder] = useState({
    address: "",
    phone: "",
    coupon: "",
  });
  const navigate = useNavigate();
  const {cartCount, setCartCount} = useContext(CartContext);
  const url = `${import.meta.env.VITE_BURL}/order`;
  const token = localStorage.getItem("token");
  const headers = token
  ? { Authorization: `Tariq__${token}` }  // Ensure correct format
  : {};  // Avoid sending incorrect headers
  console.log("token is ", token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlaceOrder({ ...placeOrder , [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., save to database or send to an API
    try{
//https://ecommerce-node4.onrender.com/order
      const response = await axios.post(url, placeOrder, {headers});
      console.log("response is", response);
      toast.success(
        "Order Submitted Successfully.",
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
      setCartCount(0);
      navigate("/account/profile/orders");
      

    }
    catch(error){
      console.error("Error submitting order: ", error);
    }

    console.log("order submitted: ", placeOrder );
  };

  return (
    <Container className="mt-5">
      <h2>Enter Shipping Address</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                name="address"
                value={placeOrder.address}
                onChange={handleChange}
                required 
              />
            </Form.Group>
          </Col>
          <Col md={12}>
            <Form.Group controlId="formPhoneNbr">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Phone Nbr"
                name="phone"
                value={placeOrder.phone}
                onChange={handleChange}
                required 
                              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group controlId="formCoupon">
              <Form.Label>Coupon</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Coupon if you have it"
                name="coupon"
                value={placeOrder.coupon}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Col>
          </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Place Order
        </Button>
      </Form>
    </Container>
  );
};

export default Address;
