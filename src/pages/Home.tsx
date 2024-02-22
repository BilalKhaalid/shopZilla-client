import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/ProductApi";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";

const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  const dispatch = useDispatch();
  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  };

  if (isError) toast.error("Cannot Fetch The Products");

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to="/search" className="findMore">
          More
        </Link>
      </h1>
      <main>
        {isLoading ? (
          <Skeleton />
        ) : (
          data?.products.map((product, index) => (
            <ProductCard
              key={index}
              productId={product._id}
              title={product.title}
              price={product.price}
              stock={product.stock}
              picture={product.picture}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
};

export default Home;
