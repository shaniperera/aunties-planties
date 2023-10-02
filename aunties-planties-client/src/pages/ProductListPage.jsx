import { useState, useEffect } from "react";
import "../ProductPage.css"
import axios from "axios";
import { Nav, Dropdown } from 'react-bootstrap'
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

const API_URL = "http://localhost:5005/api";

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [sortName, setSortName] = useState("Sort By");

    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    useEffect(() => {
        axios
            .get(`${API_URL}/products`)
            .then((response) => {
                setProducts(response.data)
            })
            .catch((error) => console.log(error));
    }, []);
    // sort filters
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
    // search 
    const searchProductList = (char) => {
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

    // const filterIndoor = () => {
    //     let list = []
    //     for (let i = 0; i < products.length; i++) {
    //         if (products[i].category.includes("indoor")) {
    //             list.push(products[i])
    //         }
    //     }
    //     setProducts(list);
    // }

    // const filterOutdoor = () => {
    //     let list = []
    //     for (let i = 0; i < products.length; i++) {
    //         if (products[i].category.includes("outdoor")) {
    //             list.push(products[i])
    //         }
    //     }
    //     setProducts(list);
    // }

    // const filterGifts = () => {

    //     let list = []
    //     for (let i = 0; i < products.length; i++) {
    //         if (products[i].category.includes("gifts")) {
    //             list.push(products[i])
    //         }
    //     }
    //     setProducts(list);
    // }

    return (
        <div className="ProjectListPage">
            <Search className="search-bar" filterSearchHandler={searchProductList} />

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

            {/* <div>
                <Nav.Link onClick={filterIndoor}>
                    Indoor plant
                </Nav.Link>
                <Nav.Link onClick={filterOutdoor}>
                    Outdoor plant
                </Nav.Link>

                <Nav.Link onClick={filterGifts}>
                    Gifts
                </Nav.Link>
            </div> */}

            <div className="product-list">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}

            </div>
        </div>
    )
}

export default ProductListPage;