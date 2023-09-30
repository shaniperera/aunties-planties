/* eslint-disable react/prop-types */
import { Button } from 'react-bootstrap';

function Counter({ incQty, decQty, qty }) {

    return (
        <>
            <Button variant="primary" onClick={incQty}>+</Button>
            <h6>{qty}</h6>
            <Button variant="primary" disabled={qty <= 1} onClick={decQty}>-</Button>
        </>
    )
}

export default Counter;