/* eslint-disable react/prop-types */
import { ProductQuantityContext } from '../context/productQuantity.context';
import { useContext } from "react";
import { Button } from 'react-bootstrap';

function Counter({ incQty, decQty }) {
    const qtyAdded = useContext(ProductQuantityContext);

    return (
        <>
            <Button onClick={incQty}>+</Button>
            <span>{qtyAdded.value}</span>
            <Button disabled={qtyAdded <= 1} onClick={decQty}>-</Button>
        </>
    );
}

/* {({ qtyAdded }) =>
            (


                <>
                    <Button onClick={incQty}>+</Button>
                    <span>{qtyAdded}</span>
                    <Button disabled={qtyAdded <= 1} onClick={decQty}>-</Button>
                </>
            )

            } */

// function Counter({ incQty, decQty, qty }) {

//     return (
//         <>
//             <Button variant="primary" onClick={incQty}>+</Button>
//             <h6>{qty}</h6>
//             <Button variant="primary" disabled={qty <= 1} onClick={decQty}>-</Button>
//         </>
//     )
// }

export default Counter;