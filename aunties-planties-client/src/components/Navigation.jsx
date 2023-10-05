import "../Navigation.css"
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

import { Nav, Navbar, NavDropdown, Stack } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/new-logo.png"

function Navigation() {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { cartQuantity } = useContext(CartContext);

    return (
        <Navbar className="nav-bar">

            <Navbar.Brand href="/"><img src={logo} alt="" style={{ width: "3em" }} /></Navbar.Brand>

            {!isLoggedIn && (
                <>
                    <Navbar.Collapse className="justify-content-end" >
                        <Nav.Link style={{ padding: "1em" }} href="/auth/signup">Sign up</Nav.Link >
                        <Nav.Link href="/login">Log in</Nav.Link>
                    </Navbar.Collapse>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Navbar.Collapse className="justify-content-end" >
                        <Nav.Link className="cart-qty" href="/user/cart">
                            <span>
                                <i className="fas fa-cart-plus"></i>
                                {cartQuantity && <i >{cartQuantity}</i>}
                            </span>
                        </Nav.Link >
                        <NavDropdown >
                            <NavDropdown.Item onClick={logOutUser} >Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Navbar.Text style={{ margin: "1.5em" }}>
                            Signed in as: {user && user.name}
                        </Navbar.Text>
                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    );
}
export default Navigation;
