import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./auth.context";

import axios from "axios";
const API_URL = import.meta.env.VITE_SERVER_URL;

const CartContext = createContext();

function CartProviderWrapper(props) {
    const { isLoggedIn, } = useContext(AuthContext);

    const [cartQuantity, setCartQuantity] = useState(0);

    const getCartTotalQty = () => {

        const storedToken = localStorage.getItem('authToken');
        if (isLoggedIn) {
            axios.get(

                // `${API_URL}/user/cart`


                `${API_URL}/user/cart`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
                .then((response) => {

                    const userCart = response.data;
                    let sumCartItemQty;

                    if (userCart.length > 0) {

                        sumCartItemQty = userCart.reduce((acc, curr) => acc + curr.quantity, 0)
                    }

                    // Update state variables        
                    setCartQuantity(sumCartItemQty);
                })
                .catch((error) => {
                    // If the server sends an error response (invalid token) 
                    console.error(error);
                    // Update state variables         
                    setCartQuantity(null)
                });
        }

    }
    useEffect(() => {
        getCartTotalQty();
    }, [cartQuantity]);

    return (
        <CartContext.Provider value={{ cartQuantity, getCartTotalQty }}>
            {props.children}
        </CartContext.Provider>
    )
}

export { CartProviderWrapper, CartContext };