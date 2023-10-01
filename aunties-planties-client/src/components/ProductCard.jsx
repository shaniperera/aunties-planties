/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import Counter from './Counter';
import { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/auth.context";


const API_URL = "http://localhost:5005/api";

function ProductCard({ product }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const loginNotify = () => toast("Login to add products to your cart");
    const outOfStockNotify = () => toast("Sorry, this plant is current not in stock");

    const handleIncQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity + 1);
    }

    const handleDecQuantity = () => {
        setQuantity((prevQuantity) =>
            prevQuantity - 1);
    }

    const handleAddToCart = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { productId: product._id, quanity: product.quantity };

        axios.post(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                console.log(response)
                setAddedToCart(true)
            })
            .catch((error) => console.log(error));
    }

    return (
        <Card style={{ width: '15rem' }}>

            <Link to={`/products/${product._id}`}>
                <Card.Img className="product-card-img" variant="top" src={product.imageUrl} />
            </Link>
            <Card.Body>
                {!product.inStock &&
                    <sub style={{ color: 'red' }}>Out of stock</sub>
                }
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>
                    ${product.price}
                </Card.Text>

                <Link>
                    {
                        isLoggedIn &&
                            !product.inStock ?
                            <>
                                <Counter incQty={handleIncQuantity} decQty={handleDecQuantity} qty={quantity} />

                                <Button className="add-to-cart" onClick={outOfStockNotify} variant="success">Add to cart</Button>
                                <ToastContainer />

                            </>
                            : isLoggedIn &&
                                product.inStock ?
                                <>
                                    {addedToCart ?
                                        <Card.Text className="add-to-cart">Added to cart</Card.Text>
                                        :
                                        <>
                                            <Counter incQty={handleIncQuantity} decQty={handleDecQuantity} qty={quantity} />

                                            <Button className="add-to-cart" onClick={handleAddToCart} variant="success">Add to cart</Button>
                                        </>
                                    }
                                    {/* <Button className="add-to-cart" onClick={handleAddToCart} variant="success">Add to cart</Button>
                                    <ToastContainer /> */}
                                </>
                                :
                                <>
                                    <Counter incQty={handleIncQuantity} decQty={handleDecQuantity} qty={quantity} />
                                    <Button className="add-to-cart" onClick={loginNotify} variant="success">Add to cart</Button>
                                    <ToastContainer />
                                </>
                    }
                </Link>

            </Card.Body>
        </Card>

    );
}

export default ProductCard;