import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005/api";

function CartPage() {
    const [cartProducts, setCartProducts] = useState([]);
    // const [quantity, setQuantity] = useState();


    const handleDeleteProduct = (e, productId) => {
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");

        console.log(productId)

        const requestBody = { productId };

        axios.put(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                console.log("Deleted the following :", response);
            })
            .catch((error) => console.log(error));
        getCart()
    }

    // const handleIncrease = (e, productId) => {
    //     e.preventDefault();
    //     const storedToken = localStorage.getItem("authToken");
    //     const requestBody = { productId, quantity };

    //     axios.post(`${API_URL}/user/cart`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
    //         .then((response) => {
    //             console.log("Added/updated the following :", response);
    //         })
    //         .catch((error) => console.log(error));
    // }
    const getCart = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${API_URL}/user/cart`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setCartProducts(response.data)
            })
            .catch((error) => console.log(error));

    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getCart();
    }, [setCartProducts]);

    return (
        <div className="CartPage">
            {
                cartProducts.length ? (
                    cartProducts.map((product) =>
                        <div className="Cart Row" key={product.productId._id} >
                            <table>
                                <tr>
                                    <td>
                                        <button
                                            onClick={(event) => handleDeleteProduct(event, product.productId._id)}>
                                            ❌
                                        </button>

                                    </td>
                                    <td>
                                        <img src={product.productId.
                                            imageUrl} alt={product.name} />
                                    </td>
                                    <td>
                                        <p>{product.productId.name}</p>
                                    </td>
                                    <td>
                                        <p>${product.productId.price}</p>
                                    </td>
                                    <td>
                                        {/* <button onClick={(event) => handleIncrease(event, product.productId._id)}> + </button> */}
                                        <p>{product.quantity}</p>
                                        {/* <button disabled={quantity <= 1} onClick={() => setQuantity((prevQuantity) => prevQuantity - 1)}> - </button> */}
                                    </td>
                                    <td>
                                        <p>${product.productId.price * product.quantity}</p>
                                    </td>
                                </tr>
                            </table>
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