import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import CartItem from "../components/CartItem.jsx";

const API_URL = "http://localhost:5005/api";

function CartPage() {
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleDeleteProduct = (e, productId) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { productId };

        axios.put(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                console.log("Deleted the following :", response);
            })
            .catch((error) => console.log(error));
        getCart()
    }

    const getCart = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/user/cart`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setCartProducts(response.data)
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    };

    const getProductItemTotal = (product) => {
        return product.productId.price * product.quantity;
    }

    const calculateCartTotal = (cartProducts) => {
        let cartTotal = cartProducts.reduce((acc, curr) => {
            return acc + curr.productId.price * curr.quantity;
        }, 0);
        return cartTotal;

    }

    let shippingFee = 10;
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getCart();
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <div className="cart-page">
            {
                !cartProducts.length &&
                <>
                    <p>Your cart is empty</p>
                    <Link to="/products">
                        <button>Shop now!</button>
                    </Link>
                </>
            }
            {cartProducts.length &&
                <>
                    <Table className="cart-table" striped bordered hover variant="light">
                        <tbody>
                            {cartProducts.map((product) =>
                                <tr key={product.productId._id}>
                                    <td>
                                        <CartItem getCart={getCart} cartTotal={calculateCartTotal(cartProducts)} prodItemTotal={getProductItemTotal} delProduct={handleDeleteProduct} product={product} />
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>
                    </Table>
                    <aside className="cart-total-aside">
                        <h5>Cart summary: </h5>
                        <p>Subtotal: {calculateCartTotal(cartProducts)}</p>

                        <p>Shipping: ${shippingFee}</p>
                        <hr />
                        <h5> Total: ${calculateCartTotal(cartProducts) + shippingFee}</h5>
                        <Button>
                            Proceed to checkout
                        </Button>
                        <Link to="/products">
                            Keep Shopping
                        </Link>
                    </aside>
                </>
            }
        </div>
    )
}

export default CartPage;
