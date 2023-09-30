import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import Counter from "../components/Counter";
import CartItem from "../components/CartItem.jsx";

const API_URL = "http://localhost:5005/api";

function CartPage() {
    const [cartProducts, setCartProducts] = useState([]);


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
            .catch((error) => console.log(error));
    };

    const getProductItemTotal = (product) => {
        return product.productId.price * product.quantity;
    }

    let cartTotal = cartProducts.reduce((acc, curr) => {
        // console.log(acc, curr.productId.price, curr.quantity)
        return acc + curr.productId.price * curr.quantity;

    }, 0);

    let shippingFee = 10;
    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getCart();
    }, [setCartProducts]);

    return (
        <div className="CartPage">
            {
                !cartProducts.length &&
                <>
                    <p>Your cart is empty</p>
                    <Link to="/products">
                        <button>Show now!</button>
                    </Link>
                </>
            }

            <Table className="cart-table" striped bordered hover variant="light">
                <tbody>
                    {cartProducts.map((product) =>
                        <tr key={product.productId._id}>
                            <td>
                                <CartItem cartTotal={cartTotal} prodItemTotal={getProductItemTotal} delProduct={handleDeleteProduct} product={product} />
                            </td>
                        </tr>
                    )
                    }
                </tbody>
            </Table>
            <aside className="cart-total-aside">
                <h5>Cart summary: </h5>
                <p>Subtotal: ${cartTotal}</p>

                <p>Shipping: ${shippingFee}</p>
                <hr />
                <h5> Total: ${cartTotal + shippingFee}</h5>

                <Button>
                    Proceed to checkout
                </Button>

            </aside>
        </div>
    )
}

export default CartPage;
