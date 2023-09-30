import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Counter from "../components/Counter";
import Spinner from "../components/Spinner";

const API_URL = "http://localhost:5005/api";

function ProductDetailsPage() {
    const { isLoggedIn } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const loginNotify = () => toast("Login to add products to your cart");
    const outOfStockNotify = () => toast("Sorry, this plant is current not in stock");

    // Get the URL parameter `:productId` 
    const { productId } = useParams();

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
        const requestBody = { productId, quantity };

        axios.post(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                console.log("Added/updated the following :", response);
            })
            .catch((error) => console.log(error));
    }

    // Helper function that makes a GET request to the API
    // and retrieves the product by id
    const getProduct = () => {
        axios
            .get(`${API_URL}/products/${productId}`)
            .then((response) => {
                const oneProduct = response.data;
                setProduct(oneProduct);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (

        <div className="ProductDetails">
            {
                isLoading &&
                <>
                    <h3>Collecting our plants from the greenhouse</h3>
                    <Spinner />
                </>
            }

            {product && (
                <div className="Product details">
                    <div className="Product image">
                        <img src={product.
                            imageUrl} alt={product.name} />
                    </div>
                    <div className="Product description">
                        <h2>{product.name}</h2>
                        <q>{product.botanicalName}</q>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>

                    {
                        !product.inStock && <p style={{ color: 'red' }}>Out of stock</p>
                    }

                    <div className="Product requirements">
                        <h4>Maintenance</h4>
                        <p>Water: {product.feedingRequirements?.water}</p>
                        <p>Humidity: {product.feedingRequirements?.humidity}</p>
                        <p>Sun: {product.feedingRequirements?.sun}</p>
                    </div>

                    <Counter incQty={handleIncQuantity} decQty={handleDecQuantity} qty={quantity} />

                    {/* <button onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}> + </button>
                    <h6>{quantity} </h6>
                    <button disabled={quantity <= 1} onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}> - </button> */}

                    <Link>
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
                                        <Button className="add-to-cart" onClick={handleAddToCart} variant="success">Add to cart</Button>
                                        <ToastContainer />
                                    </>
                                    :
                                    <>
                                        <Button className="add-to-cart" onClick={loginNotify} variant="success">Add to cart</Button>
                                        <ToastContainer />
                                    </>
                        }
                    </Link>
                </div>
            )}
            <Link to="/products">
                <button>View all products</button>
            </Link>
        </div>
    );
}

export default ProductDetailsPage;
