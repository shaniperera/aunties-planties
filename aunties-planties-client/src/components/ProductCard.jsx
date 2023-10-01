/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function ProductCard({ name, imageUrl, price, _id, inStock }) {
    return (
        <Card style={{ width: '15rem' }}>
            <Card.Img className="product-card-img" variant="top" src={imageUrl} />
            <Card.Body>
                {!inStock &&
                    <sub style={{ color: 'red' }}>Out of stock</sub>
                }
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    ${price}
                </Card.Text>
                <div style={{ marginTop: 'auto' }} >
                    <Link to={`/products/${_id}`}>
                        <Button className="product-view-button" variant="primary">View
                        </Button>
                    </Link>
                </div>
            </Card.Body>
        </Card>

    );
}

export default ProductCard;