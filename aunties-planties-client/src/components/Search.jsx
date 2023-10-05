import "../Search.css"

import { useEffect, useState } from "react";

function Search({ filterSearchHandler }) {
    const [char, setChar] = useState("");

    const handleSearch = (event) => {
        setChar(event.target.value);
        filterSearchHandler(event.target.value);
    };

    // useEffect(() => {
    //     filterSearchHandler(char)
    // }, [char])

    return (
        <div className="search-bar">
            <>
                <input
                    value={char}
                    type="text"
                    onChange={handleSearch}
                    placeholder=" 🔍 Search for plants ..."
                />
            </>
        </div>
    );
}

export default Search;