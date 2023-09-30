import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005/api";

const CartContext = React.createContext();

function CartProviderWrapper(props) {
    const [cartQuantity, setCartQuantity] = useState(0);

    const getCartTotalQty = () => {

        const storedToken = localStorage.getItem('authToken');

        axios.get(
            `${API_URL}/user/cart`,
            { headers: { Authorization: `Bearer ${storedToken}` } }
        )
            .then((response) => {

                const userCart = response.data;
                const sumCartItemQty = userCart.reduce((acc, curr) => acc + curr.quantity, 0)

                // Update state variables        
                setCartQuantity(sumCartItemQty);
            })
            .catch((error) => {
                // If the server sends an error response (invalid token) 
                // Update state variables         
                setCartQuantity(null)
            });
    }
    useEffect(() => {
        getCartTotalQty();
    }, []);

    return (
        <CartContext.Provider value={{ getCartTotalQty, cartQuantity }}>
            {props.children}
        </CartContext.Provider>
    )
}
export { CartProviderWrapper, CartContext };