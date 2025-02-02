import React from "react";
import useFetch from "../../../customHook/useFetch";
import Loader from "../../../components/user/loader/Loader";
import { Table } from "react-bootstrap";

export default function Cart() {
  const url = `${import.meta.env.VITE_BURL}/cart`;
  const token = localStorage.getItem("token");
  console.log("token is ", token);
  const headers = {
    Authorization: `tariq__${token}`,
  };
  console.log("header is", headers);
  const { response, error, isLoading } = useFetch(url, headers);
  console.log(response);
  console.log("error is ", error);
  const carts = response.data;

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Loader />;
  if (!response?.data?.cartItems) return <div>No items in your cart</div>;

  return (
    <>
      <h2>Cart</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sub Total</th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item) => (
            <tr key={item._id}>
              <td>
                <img src={item.details.mainImage.secure_url} width="50px" />
              </td>

              <td>{item.details.name}</td>
              <td>{item.details.finalprice}$</td>
              <td>{item.quantity}</td>
              <td>{item.details.finalprice * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
