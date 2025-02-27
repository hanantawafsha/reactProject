import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../../customHook/useFetch";
import Loader from "../../../components/user/loader/Loader";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import { CartContext } from "../../../components/user/context/CartContext";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import Address from "../../../components/user/address/Address";

export default function Cart() {
  const { cartCount, setCartCount } = useContext(CartContext);
  const [cart, setCart] = useState([]);

  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Tariq__${token}` } : {};
  const url = `${import.meta.env.VITE_BURL}/cart`;

  const { response, error, isLoading } = useFetch(url, headers);

  useEffect(() => {
    if (response?.data?.products) {
      setCart(response.data.products);
    }
  }, [response]);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Loader />;
  if (!cart.length) return <div className="text-center">No items in your cart</div>;

  // Increase quantity
  const increaseQty = async (ProductID) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/incraseQuantity`,
        { productId: ProductID },
        { headers }
      );
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === ProductID ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setCartCount(cartCount + 1);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease quantity
  const decreaseQty = async (ProductID) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/decraseQuantity`,
        { productId: ProductID },
        { headers }
      );
      setCart((prevCart) =>
        prevCart
          .map((item) =>
            item.productId === ProductID
              ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
              : item
          )
          .filter((item) => item.quantity > 0)
      );
      setCartCount(cartCount - 1);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  // Remove single item
  const handleRemoveItem = async (productId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BURL}/cart/removeItem`,
        { productId },
        { headers }
      );
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      setCartCount(cartCount - cart.find((item) => item.productId === productId)?.quantity || 0);
      toast.success("Item removed successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    }
  };

  // Confirm removing single item
  const confirmRemoveItem = (productId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to remove this item from your cart?",
      buttons: [
        { label: "Yes", onClick: () => handleRemoveItem(productId) },
        { label: "No" },
      ],
    });
  };

  // Clear the cart
  const handleClearCart = async () => {
    try {
      await axios.patch(`${import.meta.env.VITE_BURL}/cart/clear`, {}, { headers });
      setCart([]);
      setCartCount(0);
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear the cart!");
    }
  };

  // Confirm clearing the cart
  const confirmClearCart = () => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to remove all items from your cart?",
      buttons: [
        { label: "Yes", onClick: handleClearCart },
        { label: "No" },
      ],
    });
  };

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.details.finalPrice * item.quantity, 0);

  return (
    <Container className="mt-5">
      <h2>Cart</h2>

      <Table striped bordered hover responsive>
        <thead className="text-center">
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {cart.map((item) => (
            <tr key={item.productId}>
              <td>
                <img src={item.details.mainImage.secure_url} alt={item.details.name} width="50px" />
              </td>
              <td>{item.details.name}</td>
              <td>{item.details.finalPrice}$</td>
              <td>
                <Button variant="outline-success" onClick={() => increaseQty(item.productId)} className="mx-2">
                  +
                </Button>
                {item.quantity}
                <Button variant="outline-danger" onClick={() => decreaseQty(item.productId)} className="mx-2">
                  -
                </Button>
              </td>
              <td>{(item.details.finalPrice * item.quantity).toFixed(2)}$</td>
              <td>
                <Button variant="outline-danger" onClick={() => confirmRemoveItem(item.productId)}>
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Total Price */}
      <p>Total: {totalPrice.toFixed(2)}$</p>

      {/* Clear Cart Button */}
      <Button variant="danger" onClick={confirmClearCart} className="mt-3">
        Remove Cart
      </Button>

      {/* Place Order Form */}
      <Address />
    </Container>
  );
}
