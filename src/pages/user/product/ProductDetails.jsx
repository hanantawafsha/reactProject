import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../../components/user/loader/Loader";
import useFetch from "../../../customHook/useFetch";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Row, Button, Col, Image,Form  } from "react-bootstrap";
import { useContext } from "react";
import { CartContext } from "../../../components/user/context/CartContext";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function ProductDetails() {
  const { productID } = useParams();
  const { cartCount, setCartCount } = useContext(CartContext);
  const [hasOrdered, setHasOrdered] = useState(false); // State to track if product is ordered
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const url = `${import.meta.env.VITE_BURL}/products/${productID}`;
  const { response, error, isLoading } = useFetch(url);

  const productDetails = response?.data?.product;
  const avgRating = response?.data?.avgRating || 0;

  // Function to check if the product has been delivered
const getOrderProduct = async (productID) => {
  const token = localStorage.getItem("token");
  console.log("Checking for product:", productID);

  try {
      const { data } = await axios.get(
          `${import.meta.env.VITE_BURL}/order`,
          {
              headers: {
                  Authorization: `Tariq__${token}`,
              },
          }
      );

      console.log("Fetched orders:", data.orders);

     // First, filter only delivered orders
     const deliveredOrders = data.orders.filter(order => order.status === "deliverd");
     console.log("Delivered orders:", deliveredOrders);

      // Check if the product exists in any delivered order
      const productExists = deliveredOrders.some(order =>
          order.products.some(product => product.productId._id === productID)
      );

      console.log("Is product in delivered orders?", productExists);
      
      return productExists;
  } catch (error) {
      console.error("Error fetching orders:", error);
      return false;
  }
};


  useEffect(() => {
    // Check if the product has been ordered
    const checkIfOrdered = async () => {
      const ordered = await getOrderProduct(productID);
      console.log(ordered);
      setHasOrdered(ordered);
    };
    
    if (productID) {
      checkIfOrdered();
    }
  }, [productID]);

  // Function to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="gold" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
    }
    return stars;
  };

  // Add product to cart function
  const addProductToCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BURL}/cart`,
        { productId: productID },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      alert("Product added to cart successfully");
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart");
    }
  };

  // Submit review
  const submitReview = async () => {
    console.log("comment is", comment);
    console.log("rating is", rating);
    try {
      const token = localStorage.getItem("token"); 

      const review = await axios.post(
        //localhost:3000/products/${productID}/review
        `${import.meta.env.VITE_BURL}/products/${productID}/review`,
        { comment, rating },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      console.log("Review response is", review);
      alert("Review added successfully!");
      setReviewSuccess(true);
    } catch (error) {
      alert("Failed to add review",error);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;
  if (!productDetails) return <p>Product not found.</p>;

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">{productDetails.name}</h2>
      <Row>
        <Col md={6} className="d-flex justify-content-center">
          <Image
            src={productDetails.mainImage.secure_url}
            alt={productDetails.name}
            fluid
          />
        </Col>
        <Col md={6}>
          <div>
            <p><strong>Description:</strong> {productDetails.description}</p>
            <p><strong>Price:</strong> ${productDetails.finalPrice}</p>
            <p><strong>Stock:</strong> {productDetails.stock}</p>
            <p><strong>Average Rating:</strong> {renderStars(avgRating)} ({avgRating.toFixed(2)})</p>
          </div>

           
            <Button variant="secondary" onClick={addProductToCart} className="mt-3 me-2">
              Add to Cart
            </Button>
          

          <Button variant="secondary" as={Link} to="/products" className="mt-3">
            Back to Products
          </Button>
        </Col>
        {/* Conditional rendering of the Write a Review button */}
        {hasOrdered && !reviewSuccess && (
            <>
               <div className="mt-4">
              <h4>Write a Review</h4>
              <Form>
                <Form.Group>
                  <Form.Label>Rating</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value={0}>Select Rating</option>
                    <option value={1}>1 - Poor</option>
                    <option value={2}>2 - Fair</option>
                    <option value={3}>3 - Good</option>
                    <option value={4}>4 - Very Good</option>
                    <option value={5}>5 - Excellent</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button className="mt-2" onClick={submitReview}>Submit Review</Button>
              </Form>
            </div>
            </>
          ) }
      </Row>
    </Container>
  );
}
