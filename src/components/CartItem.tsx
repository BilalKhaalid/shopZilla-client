import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { server } from "../redux/Store";
import type { CartItem } from "../types/types";

type CartItemProps = {
  cartItem: CartItem;
  incrementHandler: (cartItem: CartItem) => void;
  decrementHandler: (cartItem: CartItem) => void;
  removeHandler: (productId: string) => void;
};

const CartItem = ({
  cartItem,
  incrementHandler,
  decrementHandler,
  removeHandler,
}: CartItemProps) => {
  const { productId, picture, title, quantity, price } = cartItem;
  return (
    <div className="cart-item">
      <img src={`${server}/${picture}`} alt={title} />
      <article>
        <Link to={`/product/${productId}`}>{title}</Link>
        <span>${price}</span>
      </article>

      <div>
        <button onClick={() => decrementHandler(cartItem)}> - </button>
        <p>{quantity}</p>
        <button onClick={() => incrementHandler(cartItem)}> + </button>
      </div>
      <button>
        <FaTrash onClick={() => removeHandler(productId)} />
      </button>
    </div>
  );
};

export default CartItem;
