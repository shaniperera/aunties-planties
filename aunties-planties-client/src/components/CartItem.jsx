import { Button, CloseButton } from 'react-bootstrap';
import Counter from './Counter';

function CartItem({ product, delProduct, prodItemTotal }) {

    return (
        <div className="cart-item-row">

            <CloseButton onClick={(event) => delProduct(event, product.productId._id)} />
            <img className="cart-item-img" src={product.productId.imageUrl} alt={product.name} />
            <h6>{product.productId.name}</h6>
            <h6>${product.productId.price}</h6>
            <h6>{product.quantity}</h6>
            <Counter />

            <h6>${prodItemTotal(product)}</h6>
        </div>
    )
}

export default CartItem;

// style = {{ width: "100px" }}