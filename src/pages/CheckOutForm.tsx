import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/Store";
import { useNewOrderMutation } from "../redux/api/OrderApi";
import { resetCart } from "../redux/reducer/CartReducer";
import { NewOrderRequest } from "../types/Api";
import { responseToast } from "../utils/Features";

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.userReducer);

  const {
    shippingInfo,
    cartItems: orderItems,
    subtotal,
    tax,
    discount,
    shippingCharges,
    total,
  } = useSelector((state: RootState) => state.cartReducer);

  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const [newOrder] = useNewOrderMutation();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    setIsProcessing(true);

    const orderData: NewOrderRequest = {
      shippingInfo,
      orderItems,
      subtotal,
      tax,
      discount,
      shippingCharges,
      total,
      user: (user && user?._id) || "",
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }

    if (paymentIntent.status === "succeeded") {
      const res = await newOrder(orderData);
      dispatch(resetCart());
      responseToast(res, navigate, "/orders");
    }
    setIsProcessing(false);
  };

  return (
    <div className="checkout-container">
      <div className="payment-card">
        <form onSubmit={submitHandler}>
          <h1>Payment</h1>
          <PaymentElement />
          <button type="submit" disabled={isProcessing === true ? true : false}>
            {isProcessing === true ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
