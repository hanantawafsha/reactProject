// Import Swiper React components
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Image } from 'react-bootstrap';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../../../components/user/loader/Loader";
import { Link } from 'react-router-dom';
export default function Category() {
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
    <>
    <Swiper
                spaceBetween={30}
                slidesPerView={3}
                loop={true}
                // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,  // 1 slide for small screens
                    },
                    768: {
                        slidesPerView: 2,  // 2 slides for medium screens
                    },
                    1024: {
                        slidesPerView: 3,  // 3 slides for larger screens
                    },
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                {categories.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className="category">
                            <Link to={`/products/${category._id}`}>
                            <Image 
                                src={category.image.secure_url} 
                                alt={category.name} 
                                fluid 
                                rounded
                                loading="lazy"  // Lazy loading the image
                            />
                             </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    </>
  )
}
