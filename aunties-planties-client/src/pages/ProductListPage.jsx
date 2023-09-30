import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        products.map((product) => {
            return (
                <Card style={{ width: '13rem' }} key={product._id}>
                    <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            ${product.price}
                        </Card.Text>
                        <Link to={`/products/${product._id}`}>
                            <Button variant="primary">View
                            </Button>
                        </Link>
                    </Card.Body>
                </Card>
            )
        }
        )
    )
}


export default ProductListPage;