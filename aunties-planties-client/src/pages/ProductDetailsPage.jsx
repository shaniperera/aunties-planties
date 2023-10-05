import "../ProductDetailsPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';

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

        <div className="product-details-container">
            <div className="all-products-return">
                <Nav.Link href="/products">
                    ⃪ View all plants
                </Nav.Link>
            </div>
            {
                isLoading &&
                <>
                    <h3 style={{ color: "white" }}>Collecting the plant from the greenhouse</h3>
                </>
            }
            {
                !isLoading &&
                <div className="product-details">
                    <div>
                        <img src={product.
                            imageUrl} alt={product.name} />
                    </div>
                    <div className="product-description ">
                        <h2>{product.name}</h2>
                        <p> Botanical name: <i>{product.botanicalName}</i></p>
                        <p>{product.description}</p>
                        <p><b>Pet friendly:</b> {product.petFriendly ? "yes" : "no"}</p>
                        <p><b>Placement: </b>{product.placement}</p>
                        <h6><b>Price:</b> ${product.price}</h6>
                        {
                            !product.inStock && <p style={{ color: 'red' }}>Out of stock</p>
                        }
                        <div className="product-reqs">
                            <h5><b>Plant care</b></h5>
                            <p><b>💧 Water: </b>{product.feedingRequirements?.water}</p>
                            <p><b>🌡️ Humidity:</b> {product.feedingRequirements?.humidity}</p>
                            <p><b>☀️ Sun:</b> {product.feedingRequirements?.sun}</p>
                        </div>
                    </div>
                </div>
            }
            {/* 
            {product && (
                // <div className="product-details">
                //     <div>
                //         <img src={product.
                //             imageUrl} alt={product.name} />
                //     </div>
                //     <div className="product-description ">
                //         <h4>{product.name}</h4>
                //         <p> <i>{product.botanicalName}</i></p>
                //         <p>{product.description}</p>
                //         <p>Pet friendly: {product.petFriendly ? "yes" : "no"}</p>
                //         <p>Placement: {product.placement}</p>
                //         <h6>Price: ${product.price}</h6>
                //         {
                //             !product.inStock && <p style={{ color: 'red' }}>Out of stock</p>
                //         }

                //         <div className="product-reqs">
                //             <h5>Plant care</h5>
                //             <p>💧 Water: {product.feedingRequirements?.water}</p>
                //             <p>🌡️ Humidity: {product.feedingRequirements?.humidity}</p>
                //             <p>☀️ Sun: {product.feedingRequirements?.sun}</p>
                //         </div>
                //     </div>
                // </div>
            )} */}
        </div>
    );
}

export default ProductDetailsPage;
