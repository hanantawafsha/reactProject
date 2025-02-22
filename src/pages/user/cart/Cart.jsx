import React, { useContext, useState } from "react";
import useFetch from "../../../customHook/useFetch";
import Loader from "../../../components/user/loader/Loader";
import { Button, Container, Table } from "react-bootstrap";
import axios from "axios";
import CustomNavbar from "../../../components/user/navbar/Navbar";

import { CartContext } from "../../../components/user/context/CartContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Address from "../../../components/user/address/Address";

export default function Cart() {
  const {cartCount,setCartCount}=useContext(CartContext);
  const [cart, setCart] = useState([]);
  const url = `${import.meta.env.VITE_BURL}/cart`;
  const token = localStorage.getItem("token");
  const headers = token
  ? { Authorization: `Tariq__${token}` }  // Ensure correct format
  : {};  // Avoid sending incorrect headers
  console.log("token is ", token);
 
  const { response, error, isLoading } = useFetch(url, headers);
  //console.log('response is',response);
  //console.log("error is ", error);
  const carts = response?.data?.products;
  console.log('cart is ',carts);

  useEffect(() => {
    if (response?.data?.products) {
      setCart(response.data.products);
    }
  }, [response]);

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Loader />;
  if (!carts) return <div>No items in your cart</div>;

  const increaseQty = async (ProductID) => {
    console.log(ProductID);
    const urlincrease = `${import.meta.env.VITE_BURL}/cart/incraseQuantity`;

    //https://ecommerce-node4.onrender.com/cart/incraseQuantity
    const responseincrease = await axios.patch(urlincrease,
       {
         productId: ProductID,
       },
       {headers}
      );
     // console.log(responseincrease);

     setCart(prevCart => {
      return prevCart.map(item => {
        if (item.productId == ProductID) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
   // setCartCount(prevCount => prevCount + 1);

  };
  const decreaseQty = async(ProductID) => {
    console.log(ProductID);
    const urldecrease = `${import.meta.env.VITE_BURL}/cart/decraseQuantity`;

    //https://ecommerce-node4.onrender.com/cart/decraseQuantity
    //  const url = `${import.meta.env.VITE_BURL}/cart`;
    const responsedecrease = await axios.patch(urldecrease,
      {
        productId: ProductID,
      },
      {headers}
     );
     console.log(responsedecrease);

     setCart(prevCart => {
      return prevCart.map(item => {
        if (item.productId == ProductID) {
          return { ...item, quantity: item.quantity - 1 };
        }
        console.log("item is",item);
        return item;
      });
    });
    //setCartCount(prevCount => prevCount - 1);


  };

  const confirmRemoveItem = (productId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to remove this item from your cart?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRemoveItem(productId)
        },
        {
          label: "No"
        }
      ]
    });
  };
   const handleRemoveItem = async(productId) => {
    // remove product from cart
    //https://ecommerce-node4.onrender.com/cart/removeItem
    try{
    const urlRemove = `${import.meta.env.VITE_BURL}/cart/removeItem`;
    const responseRemove = await axios.patch(urlRemove,
      {
        productId: productId,
      },
      {headers}
     );
     console.log(responseRemove);
     // after removing update the cart count
     setCart(prevCart => prevCart.filter(item => item.productId!== productId));
     //setCartCount(prevCount => prevCount - cart.find(item => item.productId === productId)?.quantity);
 
   }
   catch (error) {
    console.error("Error removing item:", error);
   }
  }

   const confirmRemove = (productId) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to remove your cart?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleRemove()
        },
        {
          label: "No"
        }
      ]
    });
  };
   const handleRemove = async() => {
    // remove product from cart
    //https://ecommerce-node4.onrender.com/cart/removeItem
    try {
      const urlRemove = `${import.meta.env.VITE_BURL}/cart/clear`;
      const responseRemove = await axios.patch(urlRemove, { headers });
      console.log(responseRemove);

      setCartCount(0);
      setCart([]);
      toast.success("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear the cart!");
    }

  }


  const totalPrice = cart.reduce((acc, item) => acc + item.details.finalPrice * item.quantity, 0);
 


  return (
    <>
        <Container  className="mt-5">
          

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
        {carts.map((item) => (
          <tr key={item.productId}>
            <td>
              <img
                src={item.details.mainImage.secure_url}
                alt={item.details.name}
                width="50px"
              />
            </td>
            <td>{item.details.name}</td>
            <td>{item.details.finalPrice}$</td>
            <td>
              <Button variant="outline-success"  onClick={() => increaseQty(item.productId)}  className="mx-2">
                +
              </Button>
              {item.quantity}
              <Button variant="outline-danger"  onClick={() => decreaseQty(item.productId)} className="mx-2">
                -
              </Button>
            </td>
            <td>{item.details.finalPrice * item.quantity}$</td>
            <td>
              <Button variant="outline-danger" onClick={() => confirmRemoveItem(item.productId)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    <p>Total is {totalPrice.toFixed(2)}$</p> 




    

    
    <Button variant="danger" onClick={() => confirmRemove()} className="mt-3">
      Remove Cart
    </Button>
    <Address />
    </Container>

  </>
  );
}
