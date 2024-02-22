import { FaTrash } from "react-icons/fa";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";

import { server } from "../../../redux/Store";
import { Order, OrderItem } from "../../../types/types";
import { useSelector } from "react-redux";
import {
  useOrderDetailsQuery,
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../../../redux/api/OrderApi";
import Skeleton from "../../../components/Skeleton";
import { responseToast } from "../../../utils/Features";
import { UserReducerInitialState } from "../../../types/reducer";

const TransactionManagement = () => {
  const defaultData: Order = {
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pinCode: "",
    },
    status: "",
    subtotal: 0,
    discount: 0,
    shippingCharges: 0,
    tax: 0,
    total: 0,
    orderItems: [],
    user: { name: "", userId: "" },
    _id: "",
  };
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery({
    orderId: params.id!,
    userId: user && user._id ? user._id : "",
  });

  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = data?.order || defaultData;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user && user._id ? user._id : "",
      orderId: data?.order._id || "",
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user && user._id ? user._id : "",
      orderId: data?.order._id || "",
    });
    responseToast(res, navigate, "/admin/transaction");
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <section
              style={{
                padding: "2rem",
              }}
            >
              <h2>Order Items</h2>

              {orderItems.map((i) => (
                <ProductCard
                  key={i._id}
                  title={i.title}
                  picture={`${server}/${i.picture}`}
                  productId={i.productId}
                  _id={i._id}
                  quantity={i.quantity}
                  price={i.price}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash />
              </button>
              <h1>Order Info</h1>
              <h5>User Info</h5>
              <p>Name: {data?.order.user.name}</p>
              <p>
                Address:{" "}
                {address &&
                  `${address}, ${city}, ${state}, ${country} ${pinCode}`}
              </p>
              <h5>Amount Info</h5>
              <p>subtotal: {data?.order.subtotal || subtotal}</p>
              <p>
                Shipping Charges:{" "}
                {shippingCharges === 0 ? "Free" : `Rs. ${shippingCharges}`}
              </p>
              <p>Tax: {tax}</p>
              <p>Discount: {discount}</p>
              <p>Total: {total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button className="shipping-btn" onClick={updateHandler}>
                Process Status
              </button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({
  title,
  picture,
  price,
  quantity,
  productId,
}: OrderItem) => (
  <div className="transaction-product-card">
    <img src={picture} alt={title} />
    <Link to={`/product/${productId}`}>{title}</Link>
    <span>
      ₹{price} X {quantity} = ₹{price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
