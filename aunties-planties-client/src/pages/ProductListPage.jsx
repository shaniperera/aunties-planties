import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005/api";

function ProductListPage() {
    const [products, setProducts] = useState([]);

    const getAllProducts = () => {
        axios
            .get(`${API_URL}/products`)
            .then((response) => {
                console.log(response)
                setProducts(response.data)
            })
            .catch((error) => console.log(error));
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllProducts();
    }, []);


    return (
        <div className="ProductListPage">

            {products.map((product) => {
                return (
                    <div className="ProductCard card" key={product._id} >

                        <Link to={`/products/${product._id}`}>
                            <img src={product.
                                imageUrl} alt={product.name} />
                            <h4>{product.name}</h4>

                        </Link>
                        <p>${product.price}</p>
                        <button>Add to Cart</button>
                    </div>
                );
            })}

        </div>
    );
}

export default ProductListPage;