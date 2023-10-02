import { useState } from "react";

function Search({ filterSearchHandler }) {
    const [char, setChar] = useState("");

    const handleSearch = (event) => {
        setChar(event.target.value);
        filterSearchHandler(event.target.value);
    };

    return (
        <div className="search-bar">
            <>
                <input
                    value={char}
                    type="text"
                    onChange={handleSearch}
                    placeholder=" 🔍 Search for plants ..."
                    className="search-input"
                />
            </>
        </div>
    );
}

export default Search;