import "../Navigation.css"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";

import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    // subscribe to the AuthContext to gain access to values from AuthContext.Provider `value` prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { cartQuantity } = useContext(CartContext);

    return (
        <Navbar className="nav-bar">

            <Navbar.Brand href="/">Aunties Planties</Navbar.Brand>

            {!isLoggedIn && (
                <>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="/auth/signup">Sign up</Nav.Link>
                        <Nav.Link href="/login">Log in</Nav.Link>
                    </Navbar.Collapse>
                </>
            )}
            {isLoggedIn && (
                <>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav.Link href="/user/cart">
                            <span>
                                <span>
                                    <i className="fas fa-cart-plus"></i>
                                </span>
                            </span>
                            <span>
                                {cartQuantity && <i>{cartQuantity} </i>}
                            </span>
                        </Nav.Link>
                        <NavDropdown >
                            <NavDropdown.Item onClick={logOutUser}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Navbar.Text>
                            Signed in as: {user && user.name}

                        </Navbar.Text>


                    </Navbar.Collapse>
                </>
            )}
        </Navbar>
    );
}
export default Navigation;
