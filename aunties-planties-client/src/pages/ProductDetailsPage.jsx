import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "../components/Spinner";

const API_URL = "http://localhost:5005/api";

function ProductDetailsPage() {

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Get the URL parameter `:productId` 
    const { productId } = useParams();

    useEffect(() => {
        //  GET request to the API  retrieves the product by id
        axios
            .get(`${API_URL}/products/${productId}`)
            .then((response) => {
                const oneProduct = response.data;
                setProduct(oneProduct);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [productId]);

    return (

        <div className="ProductDetails">
            <div>
                <Nav.Link href="/products">
                    View all plants
                </Nav.Link>
            </div>
            {
                isLoading &&
                <>
                    <h3>Collecting the plant from the greenhouse</h3>
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
                </div>
            )}

        </div>
    );
}

export default ProductDetailsPage;
