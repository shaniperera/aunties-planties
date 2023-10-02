import { createContext, useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005/api";

const CartContext = createContext();

function CartProviderWrapper(props) {
    const [cartQuantity, setCartQuantity] = useState(0);
    console.log(cartQuantity)

    const getCartTotalQty = () => {

        const storedToken = localStorage.getItem('authToken');

        axios.get(
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