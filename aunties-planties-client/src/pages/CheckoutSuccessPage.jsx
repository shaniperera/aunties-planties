import "../CheckoutSuccessPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect } from "react";

const API_URL = "http://localhost:5005/api";

function CheckoutSuccessPage() {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        axios.patch(`${API_URL}/user/cart`, user, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
            })
            .catch((error) => console.log(error));
    }, []);


    return (
        <div className="success-container">
            <div className="success-message">
                <h4>Thanks for your order 🪴
                </h4>
                <p>You can expect your plants within the next 5 business days</p>
                <p>Missed something? </p>
                <Link to="/products">
                    <button>Shop now!</button>
                </Link>

            </div>
        </div>
    )
}

export default CheckoutSuccessPage;