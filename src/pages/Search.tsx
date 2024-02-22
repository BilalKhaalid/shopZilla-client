import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import {
  useCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/ProductApi";
import { CustomError } from "../types/Api";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/CartReducer";

const Search = () => {
  const {
    data: categoriesResponse,
    isLoading,
    isError,
    error,
  } = useCategoriesQuery("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const {
    data: SearchResponse,
    isLoading: LoadingSearchResponse,
    isError: SearchResponseIsError,
    error: SearchResponseError,
  } = useSearchProductsQuery({
    search,
    sort,
    category: category === "all" ? "" : category, // If category is 'all', pass an empty string
    page,
    price: maxPrice,
  });

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (SearchResponseIsError) {
    const err = SearchResponseError as CustomError;
    toast.error(err.data.message);
  }

  const addToCartHandler = (cartItem: CartItem) => {
    if (cartItem.stock < 1) return toast.error("Out Of Stock");
    dispatch(addToCart(cartItem));
    toast.success("Added To Cart");
  };

  const numberOfPages = SearchResponse?.totalPages;

  return (
    <div className="search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select
            name="sort"
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="none">None</option>
            <option value="lowToHigh">Price(Low to High)</option>
            <option value="highToLow">Price(High to Low)</option>
          </select>
        </div>
        <div>
          <h4>Max Price: {maxPrice || "Search By Price"}</h4>
          <input
            type="range"
            min={10}
            max={2000000}
            name="maxPrice"
            id="maxPrice"
            value={"" || maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <h4>Category</h4>
          <select
            name="category"
            id="category"
            value={category || ""}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All</option>
            {!isLoading &&
              categoriesResponse?.categories.map((category, index) => (
                <option value={category} key={index}>
                  {category}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {LoadingSearchResponse ? (
          <Skeleton length={10} />
        ) : (
          <div className="search-list">
            {SearchResponse?.products.map((product) => (
              <ProductCard
                key={product._id}
                productId={product._id}
                title={product.title}
                price={product.price}
                stock={product.stock}
                picture={product.picture}
                handler={addToCartHandler}
              />
            ))}
          </div>
        )}

        {SearchResponse && SearchResponse?.totalPages > 1 && (
          <article>
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page < SearchResponse.totalPages}
            >
              <GrFormPrevious />
            </button>
            <span>
              {page} of {numberOfPages}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page >= SearchResponse.totalPages}
            >
              <GrFormNext />
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
