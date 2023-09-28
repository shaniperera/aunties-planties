import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:5005/api";

function ProductDetailsPage() {
    const [product, setProduct] = useState(null);
    // Get the URL parameter `:productId` 
    const { productId } = useParams();

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
                        <p>Water: {product.feedingRequirements.water}</p>
                        <p>Humidity: {product.feedingRequirements.humidity}</p>
                        <p>Sun: {product.feedingRequirements.sun}</p>
                    </div>
                    <button>Add to cart</button>
                </div>
            )}
            <Link to="/products">
                <button>View all products</button>
            </Link>
        </div>
    );
}

export default ProductDetailsPage;
