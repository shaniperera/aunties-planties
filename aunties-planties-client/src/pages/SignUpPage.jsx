import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

function SignupPage(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleName = (e) => setName(e.target.value);


    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { email, password, name };

        // Make an axios request to the API
        // If the POST request is a successful redirect to the login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/signup`, requestBody)
            .then((response) => {
                navigate('/login');
            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="auth-page-container">
            <div className="signup-page">
                <h1>Sign Up</h1>

                <form className="auth-form" onSubmit={handleSignupSubmit}>
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

                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleName}
                    />

                    <button type="submit">Sign Up</button>
                </form>

                {errorMessage && <p className="error-message">{errorMessage}</p>}

                <p>Already have an account?</p>
                <Link to={"/login"}> Login</Link>
            </div>
        </div>
    )
}

export default SignupPage;