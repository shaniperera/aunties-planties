import "../ProductListPage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Nav, Dropdown } from 'react-bootstrap'
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

const API_URL = import.meta.env.VITE_SERVER_URL;

function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([])
    const [sortName, setSortName] = useState("Sort By");
    const [loading, setLoading] = useState(true);


    // We set this effect will run only once, after the initial render
    // by setting the empty dependency array - []
    const handleFetch = () => {
        axios
            .get(`${API_URL}/products`)
            .then((response) => {
                setProducts(response.data)
                setFilteredProducts(response.data)
                setLoading(false);
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        handleFetch()
    }, []);

    // sort filters
    const sortByPriceLowHigh = () => {
        const sortedPrice = [...products].sort((a, b) => a.price - b.price)
        setFilteredProducts(sortedPrice);
        setSortName("price: low to high");
    };
    const sortByPriceHighLow = () => {
        const sortedPrice = [...products].sort((a, b) => b.price - a.price)
        setFilteredProducts(sortedPrice);
        setSortName("price: high to low");
    };
    const sortByNameAtoZ = () => {
        const sortedName = [...products].sort((a, b) => a.name.localeCompare(b.name));
        setFilteredProducts(sortedName);
        setSortName("name: a to z");
    };
    // search 
    const searchProductList = (char) => {
        let filtered;
        if (char === "") {
            filtered = products;
        } else {
            filtered = products.filter((eachProduct) => {
                return eachProduct.name.toLowerCase().includes(char.toLowerCase());
            });
        }
        setFilteredProducts(filtered);
    };
    if (loading) {
        return <h3>Collecting the plants from the greenhouse... 🪴</h3>
    }

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
        <div className="project-list-container">
            {
                !loading &&
                <div className="search-filter">
                    <Search filterSearchHandler={searchProductList} />

                    <Dropdown className="product-sort">
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {sortName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={sortByPriceLowHigh} >Price: low to high</Dropdown.Item>
                            <Dropdown.Item onClick={sortByPriceHighLow}>Price: high to low</Dropdown.Item>
                            <Dropdown.Item onClick={sortByNameAtoZ}>Name: a - z</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            }


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
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}

            </div>
        </div>
    )
}

export default ProductListPage;