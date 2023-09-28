import { Link } from "react-router-dom";
function HomePage() {
    return (
        <div>
            <h1>welcome</h1>
            <Link to="/products">
                <button>Shop All ↪</button>
            </Link>
        </div>
    );
}

export default HomePage;