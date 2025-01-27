import React, { useState, useEffect } from "react";
import { Row, Container, Button,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/user/loader/Loader";

export default function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/categories/active`
      );
      setCategories(data.categories);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-danger text-center">{error}</div>;
  }

  return (
    <Container>
      <section className="categories">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
          <Col md={4} sm={6} xs={12} key={category._id} className="my-3">
              <div className="category">
                <div className="d-flex flex-column align-items-center text-center">
                  {/* Center the image */}
                  <img
                    src={category.image.secure_url}
                    alt={category.name}
                    className="img-fluid mb-3"
                  />
                  {/* Center the button */}
                  <Button as={Link} to={`/products/${category._id}`} variant="secondary">
                    View Products
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}
