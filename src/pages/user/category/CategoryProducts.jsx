import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../../customHook/useFetch';
import Loader from '../../../components/user/loader/Loader';
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';



export default function CategoryProducts() {
    //https://ecommerce-node4.onrender.com/products/category/66fb86a741aba231158e3b51
            //console.log("parameter is", useParams());
    
    const {categoryID} = useParams();
    //console.log(categoryID); 
    const url =   `${import.meta.env.VITE_BURL}/products/category/${categoryID}`;
//console.log("url is",url);
    // Fetch the products for the given category from an API or local storage
    const {response, error, isLoading} = useFetch(url);
    console.log("the response is",response);
    const categoryProducts = response?.data?.products || [];
    //console.log(categoryProducts);
    if(isLoading) return <Loader/>;
    if(error) return <div>Error: {error.message}</div>;

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Products in Category</h2>
      {categoryProducts.length > 0 ? (
        <Row>
          {categoryProducts.map((product) => (
            <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.mainImage.secure_url}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>
                    <strong>Price:</strong> ${product.price}
                  </Card.Text>
                </Card.Body>
                <Button as={Link} to={`/product/${product._id}`} variant="secondary">
                  View Details
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">No products found for this category.</p>
      )}
    </Container>

  )
}
