import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = import.meta.env.VITE_SERVER_URL;

function LoginPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        axios.post(`${API_URL}/login`, requestBody)
            .then((response) => {
                // Request to the server's endpoint `/auth/login` returns a response
                // with the JWT string ->  response.data.authToken

                storeToken(response.data.authToken);
                // Verify the token by sending a request 
                // to the server's JWT validation endpoint. 
                authenticateUser();
                navigate('/');

            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (

        <div className="auth-page-container">
            <div className="login-page">
                <h1>Login</h1>

                <form className="auth-form" onSubmit={handleLoginSubmit}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmail}
                    />

                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePassword}
                    />

                    <button type="submit">Login</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p>No account yet?</p>
                <Link to={"/auth/signup"}> Sign Up</Link>
            </div>
        </div>

    )
}

export default LoginPage;
