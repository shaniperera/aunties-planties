import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005/api";

function CartPage() {
    const [cartProducts, setCartProducts] = useState([]);

    const getCart = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/user/cart`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setCartProducts(response.data)
                console.log("Resp. to frontend.", cartProducts)
            })
            .catch((error) => console.log(error));

    };
    console.log(cartProducts.length)

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getCart();
    }, []);

    return (
        <div className="CartPage">

            {
                cartProducts.length ? (
                    cartProducts.map((product) =>

                        <div className="Cart Card" key={product.productId_id} >
                            <img src={product.productId.
                                imageUrl} alt={product.name} />
                            <p>{product.productId.botanicalName}</p>
                            <p>${product.productId.price}</p>
                            <p>Qty: {product.quantity}</p>
                            <p>Total: {product.productId.price * product.quantity}</p>
                        </div>
                    )
                ) :
                    <>
                        <p>Your cart is empty</p>
                        <Link to="/products">
                            <button>Show now!</button>
                        </Link>
                    </>
            }
        </div>
    );
}

export default CartPage;