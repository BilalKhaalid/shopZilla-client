import axios from "axios";
import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItemCard from "../components/CartItem";
import { RootState, server } from "../redux/Store";
import {
  addToCart,
  applyDiscount,
  calculatePrice,
  removeCartItem,
} from "../redux/reducer/CartReducer";
import { CartItem } from "../types/types";

const Cart = () => {
  const {
    cartItems,
    // loading,
    discount,
    shippingCharges,
    subtotal,
    // shippingInfo,
    tax,
    total,
  } = useSelector((state: RootState) => state.cartReducer);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  const incrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity >= cartItem.stock) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrementHandler = (cartItem: CartItem) => {
    if (cartItem.quantity <= 1) return;
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const removeHandler = (productId: string) => {
    dispatch(removeCartItem(productId));
  };

  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source();

    const timeOutID = setTimeout(() => {
      axios
        .get(`${server}/api/v1/coupon/discount?couponCode=${couponCode}`, {
          cancelToken: token,
        })
        .then((res) => {
          dispatch(applyDiscount(res.data.discount));
          setIsValidCouponCode(true);
          dispatch(calculatePrice());
        })
        .catch(() => {
          dispatch(applyDiscount(0));
          setIsValidCouponCode(false);
          dispatch(calculatePrice());
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel();
      setIsValidCouponCode(false);
    };
  }, [couponCode]);

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemCard
              cartItem={item}
              key={index}
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
            />
          ))
        ) : (
          <h1>No items in the Cart</h1>
        )}
      </main>
      <aside>
        <p>Subtotal: Rs.{subtotal || 0}</p>
        <p>
          Shipping Charges:{" "}
          {shippingCharges === 0 ? "Free" : `Rs. ${shippingCharges}`}
        </p>
        <p>Tax: Rs.{tax}</p>
        <p>
          Discount:{" "}
          <em className="red"> {discount ? `- Rs. ${discount}` : 0}</em>
        </p>
        <p>
          <b>Total: Rs.{total || 0}</b>
        </p>

        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Coupon Code"
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ${discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon Code <VscError />
            </span>
          ))}

        {cartItems.length > 0 && <Link to={"/shipping"}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
