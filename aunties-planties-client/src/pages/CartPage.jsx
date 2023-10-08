import "../CartPage.css";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem.jsx";
import PayButton from "../components/PayButton.jsx";
import { CartContext } from '../context/cart.context';

const API_URL = import.meta.env.VITE_SERVER_URL;

function CartPage() {
    let shippingFee = 10;
    const [cartProducts, setCartProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getCartTotalQty } = useContext(CartContext);

    const handleDeleteProduct = (e, productId) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        const requestBody = { productId };

        axios.put(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
            })
            .catch((error) => console.log(error));
        getCart()
        getCartTotalQty();
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

    useEffect(() => {
        getCart();
        getCartTotalQty();
    }, []);

    if (loading) {
        return <h3>Loading your cart... 🪴</h3>
    }

    return (
        <div className="cart-container">
            {
                !cartProducts.length &&
                <div className="empty-cart-message">
                    <h4>Your cart is empty</h4>
                    <Link to="/products">
                        <button>Shop now!</button>
                    </Link>
                </div>
            }
            {
                cartProducts.length &&
                <div className="cart-table-info">
                    <table className="cart-table">
                        <tbody>
                            {cartProducts.map((product) =>
                                <tr key={product.productId._id}>
                                    <td>
                                        <CartItem getCart={getCart} cartTotal={calculateCartTotal(cartProducts)} prodItemTotal={getProductItemTotal} delProduct={handleDeleteProduct} product={product} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <section className="cart-total-aside">
                        <h5>Cart summary: </h5>
                        <p>Subtotal : ${calculateCartTotal(cartProducts)}</p>
                        <p>Shipping: ${shippingFee}</p>
                        <hr />
                        <h5> Total: ${calculateCartTotal(cartProducts) + shippingFee}</h5>
                        <PayButton cartItems={cartProducts} />
                        <p className='keep-shopping'>
                            <Link to="/products">
                                Keep shopping
                            </Link>
                        </p>
                    </section>
                </div>
            }
        </div >
    )
}

export default CartPage;
