import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { CartContext } from "../context/cart.context";
import { Nav, Navbar, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    // subscribe to the AuthContext to gain access to values from AuthContext.Provider `value` prop
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    const { cartQuantity } = useContext(CartContext);

    // let totalQty = 0;
    // for (let i = 0; i < cartQuantity.length; i++) {
    //     console.log("cart item:", cartQuantity[i], cartQuantity[i].quantity);
    //     totalQty += cartQuantity[i].quantity
    // }

    // console.log("calculated qty: ", totalQty)

    return (

        <Navbar>
            <Container>
                <Navbar.Brand href="/">Aunties Planties</Navbar.Brand>
                <Nav className="me-auto">


                    {!isLoggedIn && (
                        <>
                            <Nav.Link href="/auth/signup">Sign up</Nav.Link>
                            <Nav.Link href="/login">Log in</Nav.Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Nav.Link href="/user/cart"> 🛒 {cartQuantity} plants in the cart</Nav.Link>
                            <Nav.Link>{user && user.name}</Nav.Link>
                            {/* <Nav.Link>{cartQuantity} plants in the cart</Nav.Link> */}

                            <Button onClick={logOutUser}>Logout</Button>
                        </>
                    )}
                </Nav>
            </Container >
        </Navbar>
    )
}
export default Navigation;
