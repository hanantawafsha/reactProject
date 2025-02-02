import React from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../../../components/user/loader/Loader";
import useFetch from "../../../customHook/useFetch";
import axios from "axios";
import Container from "react-bootstrap/Container";
import { Row,Button,Col,Image } from "react-bootstrap";


export default function ProductDetails() {
  const { productID } = useParams();
  const url = `${import.meta.env.VITE_BURL}/products/${productID}`;
  const { response, error, isLoading } = useFetch(url);

  // Safely access the product details
  const productDetails = response?.data?.product;
  // add product to cart function 
  
  const addProductToCart =  async() => {
    const token = localStorage.getItem('token');
    try{
      const {data} = await axios.post(`${import.meta.env.VITE_BURL}/cart`,
         {productId: productID}
        , {
        headers: {
          Authorization: `Tariq__${token}`,
        }
      });
      console.log(data);
      alert("Product added to cart successfully");
    }
    catch(error){
      console.error(error);
      alert("Failed to add product to cart");
    }
    finally{
      console.log('the product id is',productID);
      console.log('the token is',token)
    }
    
  }

  // Handle loading and error states
  if (isLoading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  // Return early if productDetails is undefined
  if (!productDetails) return <p>Product not found.</p>;


  return (
    <>
     

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
            <p><strong>Average Rating:</strong> {productDetails.avgRating || "No ratings yet"}</p>
          </div>
          <Button variant="secondary" onClick={addProductToCart} className="mt-3 me-2">
            Add to Cart
          </Button>
          <Button variant="secondary" as={Link} to="/products" className="mt-3">
            Back to Products
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}
