import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../context/auth.context";
import { CartContext } from '../context/cart.context';

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProductCard({ product }) {
    const { isLoggedIn } = useContext(AuthContext);
    const [addedToCart, setAddedToCart] = useState(false);
    const loginNotify = () => {
        toast("Login to add products to your cart", { position: "bottom-right", autoClose: 1500 }
        )
    }
    const outOfStockNotify = () => { toast("Sorry, this plant is currently not in stock", { position: "bottom-right", autoClose: 1500 }) };


    const handleAddToCart = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { productId: product._id, quanity: 1 };

        axios.post(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setAddedToCart(true)
                getCartTotalQty();
            })
            .catch((error) => console.log(error));
    }
    const { getCartTotalQty } = useContext(CartContext);

    return (
        <div>
            <Card style={{ width: '15rem', textAlign: "center", boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)" }}>

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

                    <div>
                        {
                            isLoggedIn &&
                                !product.inStock ?
                                <>
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
                                                <Button className="add-to-cart" onClick={handleAddToCart} variant="success">Add to cart</Button>
                                            </>
                                        }
                                    </>
                                    :
                                    <>
                                        <Button className="add-to-cart" onClick={loginNotify} variant="success">Add to cart</Button>
                                        <ToastContainer />
                                    </>
                        }
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default ProductCard;