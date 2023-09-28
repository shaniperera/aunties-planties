import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
    // subscribe to the AuthContext to gain access to values from AuthContext.Provider `value` prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return (
        <nav>
            <Link to="/">
                <li>Home</li>
            </Link>
            {!isLoggedIn && (
                <>
                    <Link to="/auth/signup">
                        <li>SignUp</li>
                    </Link>
                    <Link to="/login">
                        <li>Log in</li>
                    </Link>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Link to="/user/cart">
                        <li>🛒</li>
                    </Link>
                    <button onClick={logOutUser}>Logout</button>
                    <span>{user && user.name}</span>
                </>
            )}

        </nav>
    );
}

export default Navbar;