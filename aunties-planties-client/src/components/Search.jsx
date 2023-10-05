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

        <>
            <input
                value={char}
                type="text"
                onChange={handleSearch}
                placeholder=" 🔍 Search for plants ..."
            />
        </>
    );
}

export default Search;