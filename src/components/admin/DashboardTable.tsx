import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "Id",
    accessor: "_id",
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
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
];

const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  // Check if data exists and it's an array before iterating
  if (!Array.isArray(data)) {
    return <div>No data available.</div>;
  }

  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",
    "Top Transaction"
  )();
};

export default DashboardTable;
