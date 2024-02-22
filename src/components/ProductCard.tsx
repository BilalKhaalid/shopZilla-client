import { FaPlus } from "react-icons/fa";
import { CartItem } from "../types/types";

type ProductsProps = {
  productId: string;
  picture: string;
  title: string;
  price: number;
  stock: number;
  handler: (cartItem: CartItem) => string | undefined;
};

function ProductCard({
  productId,
  picture,
  title,
  price,
  stock,
  handler,
}: ProductsProps) {
  return (
    <div className="product-card">
      <img src={`${import.meta.env.VITE_SERVER}/${picture}`} alt={title} />
      <p>{title}</p>
      <span>Rs.{price}</span>

      <div>
        <button
          onClick={() =>
            handler({
              productId,
              picture,
              title,
              price,
              stock,
              quantity: 1,
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
