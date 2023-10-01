import React, { useState } from "react";

const ProductQuantityContext = React.createContext();

function ProductQuantityProviderWrapper(props) {
    const [qtyAdded, setQtyAdded] = useState(1);
    return (
        <ProductQuantityContext.Provider value={{ qtyAdded, setQtyAdded }}>
            {props.children}
        </ProductQuantityContext.Provider>
    )
}
export { ProductQuantityContext, ProductQuantityProviderWrapper };