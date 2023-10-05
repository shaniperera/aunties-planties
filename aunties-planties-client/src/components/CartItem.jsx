import { Button, CloseButton } from 'react-bootstrap';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { CartContext } from '../context/cart.context';

const API_URL = "http://localhost:5005/api";

function CartItem({ product, delProduct, prodItemTotal, getCart }) {
    const [qty, setQty] = useState(product.quantity);

    const handleAddToCart = () => {
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { productId: product.productId._id, quantity: qty };
        axios.post(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {

            })
            .catch((error) => console.log(error));
    };
    const { getCartTotalQty } = useContext(CartContext);

    const handleIncQuantity = () => {
        setQty((prevQuantity) => prevQuantity + 1);
        getCartTotalQty();
    };

    const handleDecQuantity = () => {
        setQty((prevQuantity) => prevQuantity - 1);
        getCartTotalQty();

    };

    // useEffect to handle side-effects after component updates
    useEffect(() => {
        handleAddToCart();
        const timer = setTimeout(() => {
            getCart();
        }, 500);

        return () => clearTimeout(timer);
    }, [qty]);

    return (
        <div className="cart-item-row">
            <CloseButton onClick={(event) => delProduct(event, product.productId._id)} />
            <img className="cart-item-img" src={product.productId.imageUrl} alt={product.name} />
            <h6>{product.productId.name}</h6>
            <h6>${product.productId.price}</h6>
            <Button onClick={handleIncQuantity} >+</Button>
            <h6>{product.quantity}</h6>
            <Button disabled={product.quantity <= 1} onClick={handleDecQuantity}>-</Button>
            <h6>${prodItemTotal(product)}</h6>
        </div >
    )
}

export default CartItem;
