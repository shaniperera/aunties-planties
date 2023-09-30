import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005/api";

function ProductDetailsPage() {
    const { isLoggedIn } = useContext(AuthContext);
    const loginNotify = () => toast("Login to add products to your cart");
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Get the URL parameter `:productId` 
    const { productId } = useParams();

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
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div className="ProductDetails">
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
                    <div className="Product requirements">
                        <h4>Maintenance</h4>
                        <p>Water: {product.feedingRequirements?.water}</p>
                        <p>Humidity: {product.feedingRequirements?.humidity}</p>
                        <p>Sun: {product.feedingRequirements?.sun}</p>
                    </div>
                    <button onClick={() => setQuantity((prevQuantity) => prevQuantity + 1)}> + </button>
                    <h6>{quantity} </h6>
                    <button disabled={quantity <= 1} onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}> - </button>

                    <Link>
                        {
                            isLoggedIn &&
                            <>
                                <button
                                    onClick={handleAddToCart} >
                                    Add to cart</button>
                                <ToastContainer />
                            </>

                        }
                        {!isLoggedIn &&
                            <>
                                <button onClick={loginNotify}>Add to cart</button>
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
