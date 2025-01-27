import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/user/loader/Loader";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


export default function Products() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([{}]);

    const getProducts = async () => {
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BURL}/products`);
           // console.log(response.data);
            setProducts(data.products);
        } catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getProducts();
    }, []);
    
    if (isLoading) {
        return <Loader/>
    }
  return (
<Container className="my-4">
      <h2 className="mb-4 text-center">All Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={product.mainImage.secure_url}
                alt={product.name}
              />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Button as={Link} to={`/product/${product._id}`} variant="secondary">
                  Product Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>

    )
}
