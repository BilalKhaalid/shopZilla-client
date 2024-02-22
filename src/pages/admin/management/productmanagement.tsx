import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer";
import {
  useDeleteProductMutation,
  useProductDetailsQuery,
  useUpdateProductMutation,
} from "../../../redux/api/ProductApi";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { server } from "../../../redux/Store";
import { responseToast } from "../../../utils/Features";

const Productmanagement = () => {
  const { user } = useSelector(
    (state: { userReducer: UserReducerInitialState }) => state.userReducer
  );
  const params = useParams();
  const navigate = useNavigate();
  const { data, isError } = useProductDetailsQuery({
    id: params.id!,
    userId: user?._id || "",
  });

  const [product, setProduct] = useState({
    _id: "",
    picture: "",
    category: "",
    title: "",
    stock: 0,
    price: 0,
  });

  const { title, category, price, stock } = product;

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(title);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (nameUpdate) formData.set("title", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("picture", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      userId: user?._id || "",
      productId: data?.product._id || "",
      formData,
    });

    responseToast(res, navigate, "/admin/product");
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      userId: user?._id || "",
      productId: product._id,
    });
    responseToast(res, navigate, "/admin/product");
  };

  useEffect(() => {
    if (data) {
      setProduct(data.product);
      setNameUpdate(data.product.title);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setPhotoUpdate(data.product.picture);
    }
  }, [data, data?.product]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {product._id}</strong>
          <img src={`${server}/${product.picture}`} alt={product.title} />
          <p>{product.title}</p>
          {stock > 0 ? (
            <span className="green">{product.stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{product.price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={deleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={product.category}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && <img src={photoUpdate} alt={product.title} />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
