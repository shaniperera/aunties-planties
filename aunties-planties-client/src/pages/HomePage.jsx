
import "../HomePage.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from '../context/cart.context';
import recycle from "../assets/recycle.svg"
import leaf from "../assets/leaf.svg"
import truck from "../assets/truck.svg"

import plantsTogether from "../assets/plants-together.jpeg"

function HomePage() {
    const { getCartTotalQty } = useContext(CartContext);
    getCartTotalQty();
    return (
        <div className='homepage-container'>
            <section className="hero-section">
                <Link className="shop-all-btn" to="/products">
                    <button>Shop All </button>
                </Link>

            </section>
            <section className="shop-with-us">
                <h3>Why shop with us?</h3>
                <div className='why-shop-tiles'>
                    <div>
                        <img src={leaf} alt="" />
                        <p>Locally grown with love</p>
                    </div>
                    <div>
                        <img src={recycle} alt="" />
                        <p>Grown in reused pots</p>
                    </div>
                    <div>
                        <img src={truck} alt="" />
                        <p>Free delivery over $100</p>
                    </div>
                </div>
            </section>
            <section className="about-us">
                <div className="about-us-text">
                    <h2>About us</h2>
                    <p>
                        Whether you are after a splash of colour for your living room or want to create a mini jungle on your patio, you will find the perfect plants from our selection that will help you bring life to your surroundings.
                    </p>
                    <p>
                        Stemming from a love for all things green, our mission is to share our passion for plants with you. We offer a range of indoor, outdoor and decorative plants. All lush, green and well cared for.
                    </p>
                </div>
                <div className="about-us-img" >
                    <img src={plantsTogether} alt="" />
                </div>
            </section>
        </div>
    );
}

export default HomePage;