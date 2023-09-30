import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";


function App() {
  return (
    <div className="App">

      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:productId" element={<ProductDetailsPage />} />
        <Route path="/user/cart" element={<CartPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

      </Routes>

    </div>
  );
}
export default App;