import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Dropdown } from 'react-bootstrap'
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

const API_URL = "http://localhost:5005/api";

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [updatedProducts, setUpdatedProducts] = useState([products]);
    const [sortName, setSortName] = useState("Sort By");

    const getAllProducts = () => {
        axios
            .get(`${API_URL}/products`)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => console.log(error));
    };
    const sortByPriceLowHigh = () => {
        const sortedPrice = [...products].sort((a, b) => a.price - b.price)
        setProducts(sortedPrice);
        setSortName("price: low to high");
    };
    const sortByPriceHighLow = () => {
        const sortedPrice = [...products].sort((a, b) => b.price - a.price)
        setProducts(sortedPrice);
        setSortName("price: high to low");
    };
    const sortByNameAtoZ = () => {
        const sortedName = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setProducts(sortedName);
        setSortName("name: a to z");

    };
    const filterProductList = (char) => {
        let filteredProducts;

        if (char === "") {
            filteredProducts = products;
        } else {
            filteredProducts = products.filter((eachProduct) => {
                return eachProduct.name.toLowerCase().includes(char.toLowerCase());
            });
        }
        setProducts(filteredProducts);
    };

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <div className="ProjectListPage">
            <Search filterSearchHandler={filterProductList} />

            <Dropdown className="product-sort">
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Sorted: {sortName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={sortByPriceLowHigh} >Price: low to high</Dropdown.Item>
                    <Dropdown.Item onClick={sortByPriceHighLow}>Price: high to low</Dropdown.Item>
                    <Dropdown.Item onClick={sortByNameAtoZ}>Name: a - z</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                ))}

            </div>
        </div>
    )
}


// products.map((product) => {
// <Card style={{ width: '13rem' }} key={product._id}>
//     <Card.Img variant="top" src={product.imageUrl} alt={product.name} />
//     <Card.Body>
//         <Card.Title>{product.name}</Card.Title>
//         <Card.Text>
//             ${product.price}
//         </Card.Text>
//         <Link to={`/products/${product._id}`}>
//             <Button variant="primary">View
//             </Button>
//         </Link>
//     </Card.Body>
// </Card>
// }

export default ProductListPage;