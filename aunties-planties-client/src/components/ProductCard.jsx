/* eslint-disable react/prop-types */
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function ProductCard({ name, imageUrl, price, _id, inStock }) {
    return (
        <Card style={{ width: '13rem' }} className="ProductCard">
            <Card.Img variant="top" src={imageUrl} alt={name} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    ${price}
                </Card.Text>

                {!inStock &&
                    <Card.Text style={{ color: 'red' }}>
                        Out of stock
                    </Card.Text>
                }
                <Link to={`/products/${_id}`}>
                    <Button variant="primary">View
                    </Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default ProductCard;