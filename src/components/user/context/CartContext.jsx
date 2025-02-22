import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";


export const CartContext = createContext();

 const CartContextProvider = ({ children}) => {
    const [cartCount, setCartCount] = useState(0);
    useEffect(() => {
        getCart();
    },[]);
    const getCart = async() => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return; 

            const url = `${import.meta.env.VITE_BURL}/cart`;
            const response = await axios.get(url, { headers: { Authorization: `Tariq__${token}` } });

            if (response.data.count !== cartCount) { 
                setCartCount(response.data.count);
            }
        } catch (error) {
            console.error("Failed to fetch cart data:", error);
        }
    }
    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>

    );
}

export default CartContextProvider;