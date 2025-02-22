import React from "react";
import Form from "react-bootstrap/Form";
import {Button,Container, Col, Row,Card, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

import { UserContext } from '../../../components/user/context/UserContext'
import { useContext } from "react";
import Loader from "../../../components/user/loader/Loader";
import { useState } from "react";


export default function UserImage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {user,setUser} = useContext(UserContext);
const [imagePreview, setImagePreview]= useState(null);
const [isLoading, setIsLoading] = useState(false);
  const uploadImg = async (data) => {
    const token = localStorage.getItem("token");
    console.log(data);
    const formData = new FormData();
    formData.append("image", data.imageFile[0]);
    console.log("file data", data.imageFile[0]);
    formData.forEach((value, key)=>{
        console.log(`value is ${value}...  key~=${key}`);
      });
    
    try {
        setIsLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_BURL}/user/update-image`,
        formData,
        {
          headers: {
            Authorization: `Tariq__${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response.status == 200)
      {
        toast.success("Image updated successfully");
        setUser({...user, image: response.data.user.image});

      }
    } catch (error) {
      console.log("Error uploading image",error);
    }
    finally{
        setIsLoading(false);
    }
    
   
            

  
};
const handleImageChange = (event) =>{
    const file = event.target.files[0];
    setImagePreview(URL.createObjectURL(file));
        };
 
  if(isLoading) return <Loader/>

  return (
    <>
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
      <Form onSubmit={handleSubmit(uploadImg)} encType="multipart/form-data">
        <Form.Group controlId="uploadImg" className="mb-3">
          <Form.Label>Please select your image</Form.Label>
          <Form.Control type="file" 
          {...register("imageFile", { required: "Image file is required" })}
          onChange={handleImageChange}/>
        </Form.Group>
        <Button type="submit">Update Image</Button>
      </Form>

      
          <Card className="shadow-lg p-3 text-center">
            <Image
src={imagePreview ? imagePreview : user?.image?.secure_url }     
         alt="Profile"
              roundedCircle
              className="mx-auto d-block mb-3"
            />
            </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
}
