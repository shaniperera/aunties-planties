// import { createContext, useState } from "react";

// const ProductQuantityContext = createContext();

// function ProductQuantityProviderWrapper(props) {
//     const [qtyAdded, setQtyAdded] = useState(1);

//     const handleIncQuantity = () => {
//         setQtyAdded((prevQuantity) =>
//             prevQuantity + 1);
//     }

//     const handleDecQuantity = () => {
//         setQtyAdded((prevQuantity) =>
//             prevQuantity - 1);
//     }
//     return (
//         <ProductQuantityContext.Provider value={{ qtyAdded, handleIncQuantity, handleDecQuantity }}>
//             {props.children}
//         </ProductQuantityContext.Provider>
//     )
// }
// export { ProductQuantityContext, ProductQuantityProviderWrapper };