import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../../../components/user/loader/Loader";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export default function Products() {
  console.log("Hello From Product");

  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Page state
  const [limit, setLimit] = useState(3);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // Separate input field
  const [priceRange, setPriceRange] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // Fetch products from API
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams(location.search);
      //console.log(queryParams);
      const searchValue = queryParams.get("search") || "";
      const sortValue = queryParams.get("sort") || "";
      const priceValue = queryParams.get("price") || "";
      const limitValue = queryParams.get("limit") || "3";
      const pageValue = queryParams.get("page") || "1";

      setSearch(searchValue);
      setSort(sortValue);
      setPriceRange(priceValue);
      setLimit(Number(limitValue));
      setPage(Number(pageValue));

      let priceFilter = "";
      if (priceValue) {
        const [minPrice, maxPrice] = priceValue.split("-");
        if (minPrice) priceFilter += `&price[gte]=${minPrice}`;
        if (maxPrice) priceFilter += `&price[lte]=${maxPrice}`;
      }

      // API Request including 'URL' parameters
      const { data } = await axios.get(
        `${import.meta.env.VITE_BURL}/products?page=${pageValue}&limit=${limitValue}&search=${searchValue}&sort=${sortValue}${priceFilter}`
      );

      console.log("API Response: ", data);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / limit)); // Ensure 'total' is coming from API
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update URL when filters or page change
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (search) queryParams.set("search", search);
    else queryParams.delete("search");// to clear it frim the url when selecting default values

    if (sort) queryParams.set("sort", sort);
    else queryParams.delete("sort"); // to clear it frim the url when selecting default values

    if (priceRange) queryParams.set("price", priceRange);
    else queryParams.delete("price"); // to clear it from the url when selecting default values
    queryParams.set("limit", limit);
    queryParams.set("page", page);

    navigate(`?${queryParams.toString()}`);
  }, [search, sort, priceRange, limit, page]);

  // Fetch products when URL changes
  useEffect(() => {
    getProducts();
  }, [location.search]);

  // Function to handle search button click
  const handleSearch = () => {
    setSearch(searchInput);
    setPage(1); // Reset page to first when searching
  };

  // Function to reset all filters
  const resetFilters = () => {
    setSearch("");
    setSearchInput("");
    setSort("");
    setPriceRange("");
    setLimit(3); // Reset to default limit
    setPage(1); // Reset page
    navigate("?"); // Reset URL
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">All Products</h2>

      {/* Search and Filters */}
      <Row className="mb-4">
        {/* Search Box with Button */}
        <Col md={4} className="d-flex">
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button variant="secondary" className="ms-2" onClick={handleSearch}>
            Search
          </Button>
        </Col>

        {/* Sort by */}
        <Col md={2}>
          <Form.Select value={sort} onChange={(e) => {
              const selectedValue = e.target.value;
             setSort(selectedValue === "" ? "" : selectedValue);
            setPage(1); // Reset page when changing sort
            }}>
            <option value="">Default</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
            <option value="name">Name (A-Z)</option>
            <option value="-name">Name (Z-A)</option>
            <option value="discount">Discount</option>
            <option value="-discount">Discount (High to Low)</option>
          </Form.Select>
        </Col>

        {/* Price Range */}
        <Col md={2}>
          <Form.Select value={priceRange} onChange={(e) => {
             const selectedValue = e.target.value;
            setPriceRange(selectedValue === "" ? "" : selectedValue);

            setPage(1); // Reset page when changing price range
            }}>
            <option value="">All Prices</option>
            <option value="0-100">Under $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000-1500">$1000 - $1500</option>
            <option value="1500-2000">$1500 - $2000</option>
            <option value="2000-2500">$2000 - $2500</option>
            <option value="2500-999999">Greater than $2500</option>
          </Form.Select>
        </Col>

        {/* Limit (Number of Products per Page) */}
        <Col md={2}>
          <Form.Select value={limit} onChange={(e) => {
      setLimit(Number(e.target.value));
      setPage(1);
    }}>
            <option value="3">Show 3</option>
            <option value="6">Show 6</option>
            <option value="9">Show 9</option>
            <option value="12">Show 12</option>
          </Form.Select>
        </Col>

        {/* Reset Filter Button */}
        <Col md={2}>
          <Button variant="danger" onClick={resetFilters}>
            Reset Filters
          </Button>
        </Col>
      </Row>

      {/* Product List */}
      <Row>
        {products.length > 0 ? (
          products.map((product) => (
            <Col md={4} sm={6} xs={12} key={product._id} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.mainImage?.secure_url}
                  alt={product.name}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>Price: ${product.finalPrice}</Card.Text>
                  <Button as={Link} to={`/product/${product._id}`} variant="secondary">
                    Product Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No products found.</p>
        )}
      </Row>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="dark"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>

        <span className="mx-3"> Page {page} of {totalPages} </span>

        <Button
          variant="dark"
          onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
}
