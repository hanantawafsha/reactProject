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
  
    if (placeOrder.coupon) {
      try {
        const couponUrl = `${import.meta.env.VITE_BURL}/coupon`;
        const response = await axios.get(couponUrl, { headers });
  
        if (response.data.message !== "success" || !response.data.coupons) {
          toast.error("Error fetching coupons. Try again later.");
          return;
        }
  
        const validCoupons = response.data.coupons;
        const enteredCoupon = validCoupons.find(c => c.name === placeOrder.coupon);
        console.log("valid coupons are", validCoupons);
  
        if (!enteredCoupon) {
          toast.error("Invalid coupon code!", { transition: Bounce });
          return; // Stop order submission
        }
  
        // Check if the coupon is expired
        const currentDate = new Date();
        const expireDate = new Date(enteredCoupon.expireDate);
        console.log("expire date is",expireDate);
        if (currentDate > expireDate) {
          toast.error("This coupon has expired!", { transition: Bounce });
          return;
        }
  
        // Check if the coupon has already been used by the current user
        const userId = localStorage.getItem("userID"); // Ensure user ID is stored in localStorage
        if (userId && enteredCoupon.usedBy.includes(userId)) {
          toast.error("You have already used this coupon!", { transition: Bounce });
          return;
        }
  
        toast.success("Coupon applied successfully!", { transition: Bounce });
  
      } catch (error) {
        console.error("Error validating coupon:", error);
        toast.error("Error checking coupon. Try again later.");
        return;
      }
    }
  
    // Proceed with order submission if the coupon is valid or not entered
    try {
      const response = await axios.post(url, placeOrder, { headers });
      console.log("response is", response);
  
      toast.success("Order Submitted Successfully.", {
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
  
      setCartCount(0);
      navigate("/account/profile/orders");
  
    } catch (error) {
      console.error("Error submitting order: ", error);
      toast.error("Failed to submit order. Please try again.");
    }
  
    console.log("order submitted: ", placeOrder);
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
