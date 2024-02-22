import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, server } from "../redux/Store";
import { saveShippingInfo } from "../redux/reducer/CartReducer";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems, total } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    state: "",
    city: "",
    country: "",
    pinCode: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingInfo));

    try {
      const { data } = await axios.post(
        `${server}/api/v1/payment/create`,
        {
          amount: total,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/pay", {
        state: data.clientSecret,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping">
      <button className="backBtn" onClick={() => navigate("/cart")}>
        <BiArrowBack />
      </button>
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={handleChange}
        />
        <input
          type="text"
          name="pinCode"
          placeholder="Pin Code"
          value={shippingInfo.pinCode}
          onChange={handleChange}
        />
        <select
          name="country"
          id="country"
          value={shippingInfo.country}
          onChange={handleChange}
        >
          <option value="Choose Country">Choose Country</option>
          <option value="India">India</option>
          <option value="Pak">Pakistan</option>
        </select>
        <button className="pay">Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
