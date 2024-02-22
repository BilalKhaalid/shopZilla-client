import { ReactElement, useEffect, useState } from "react";
import { Column } from "react-table";
import TableHOC from "../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../types/reducer";
import { useAllOrdersQuery } from "../redux/api/OrderApi";
import { CustomError } from "../types/Api";
import toast from "react-hot-toast";
import Skeleton from "../components/Skeleton";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];

const Orders = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );

  const { isLoading, isError, error, data } = useAllOrdersQuery(
    user?._id || ""
  );

  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "order1",
      amount: 500,
      quantity: 1,
      discount: 50,
      status: <span className="red">Processing</span>,
      action: <Link to={`/orders/:id`}>View</Link>,
    },
  ]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((order) => ({
          _id: order._id,
          amount: order.total,
          discount: order.discount,
          quantity: order.orderItems.length,
          status: (
            <span
              className={
                order.status === "Processing"
                  ? "red"
                  : order.status === "Shipped"
                  ? "green"
                  : "purple"
              }
            >
              {order.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${order._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton /> : Table}
    </div>
  );
};

export default Orders;
