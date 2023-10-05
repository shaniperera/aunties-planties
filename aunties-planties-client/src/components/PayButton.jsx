import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from "../context/auth.context";
import { Button } from 'react-bootstrap';
import { useContext } from "react";

const API_URL = "http://localhost:5005/api";

function PayButton({ cartItems }) {
    const { user } = useContext(AuthContext);

    const storedToken = localStorage.getItem("authToken");

    const handleCheckout = () => {

        axios.post(`${API_URL}/create-checkout-session`, { cartItems, userId: user._id }, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                if (response.data.url) {
                    window.location.href = response.data.url;
                }
            })
            .catch((err) => console.log(err.message))
    }

    return (
        <>
            <Button variant="success" onClick={handleCheckout}>Checkout </Button>
        </>
    )

}

export default PayButton;