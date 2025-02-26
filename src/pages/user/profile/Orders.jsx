import React, { useState, useEffect } from "react";
import useFetch from "../../../customHook/useFetch";
import Loader from "../../../components/user/loader/Loader";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

export default function Orders() {
  const url = `${import.meta.env.VITE_BURL}/order`;
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Tariq__${token}` } : {};

  // State for holding orders
  const [orders, setOrders] = useState([]);

  const { response, error, isLoading } = useFetch(url, headers);

  // Fetch orders on component mount
  useEffect(() => {
    if (response?.data?.orders) {
      setOrders(response.data.orders);
    }
  }, [response]); // Only update orders when response changes

  const handleCancelOrder = async (orderId) => {
    try {
      const dataResponse = await axios.patch(
        `${url}/cancel/${orderId}`,
        {},
        { headers }
      );
      alert("Order canceled successfully");
    } catch (error) {
      alert("Error canceling order");
    }
  };

  console.log("Orders are:", orders);

  if (isLoading) return <Loader />;
  if (error) return <div className="text-danger">Error: {error.message}</div>;
  if (!orders.length) return <div className="text-center">No orders found</div>;

  return (
    <Container className="mt-4">
      {orders.map((order) => (
        <div key={order._id} className="mb-4 p-3 border rounded">
          <h4>Order Details:</h4>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>

          <h5>Address:</h5>
          <p>{order.address}</p>

          <h5>Coupon:</h5>
          <p>{order.couponName || "No coupon applied"}</p>

          <h5>Products:</h5>
          <Row className="d-flex flex-wrap">
            {order.products?.map((product) => {
              const prod = product.productId || {};
              return (
                <Col key={prod._id} md={4} sm={6} xs={12} className="mb-3">
                  <div className="p-2 border rounded text-center">
                    <Image
                      src={prod.mainImage?.secure_url || "default-image.jpg"}
                      alt={prod.slug || "Product Image"}
                      fluid
                      className="mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <h6>{prod.slug || "Unknown Product"}</h6>
                    <p>
                      <strong>Price:</strong> {prod.finalPrice || "N/A"}$
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                  </div>
                </Col>
              );
            })}
          </Row>

          <h5 className="mt-3">Total: {order.finalPrice}$</h5>

          <Button
            type="button"
            className="my-3"
            variant="danger"
            size="lg"
            onClick={() => handleCancelOrder(order._id)}
            disabled={order.status !== "pending"}
          >
            Cancel Order
          </Button>
        </div>
      ))}
    </Container>
  );
}
