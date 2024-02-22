import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Navigate, useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOut = () => {
  const location = useLocation();
  const clientSecret: string | undefined = location.state;
  if (!clientSecret) return <Navigate to={"/shipping"} />;

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
      }}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default CheckOut;
