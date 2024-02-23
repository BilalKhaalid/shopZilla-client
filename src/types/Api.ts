import {
  Bar,
  CartItem,
  Line,
  Order,
  Pie,
  Product,
  ShippingInfo,
  Stats,
  User,
} from "./types";

type MessageResponse = {
  success: boolean;
  message: string;
};

type UserResponse = {
  success: boolean;
  user: User;
};

type AllUsersResponse = {
  success: boolean;
  users: User[];
};

type ProductResponse = {
  success: boolean;
  products: Product[];
};
type AdminProductsResponse = {
  success: boolean;
  AdminProducts: Product[];
};
type ProductDetailResponse = {
  success: boolean;
  product: Product;
  id: string;
  UserId: string;
};
type CategoriesResponse = {
  success: boolean;
  categories: string[];
};
type SearchProductsResponse = ProductResponse & {
  totalPages: number;
};

type AllOrdersResponse = {
  success: boolean;
  orders: Order[];
};

type OrderDetailsResponse = {
  success: boolean;
  order: Order;
};

type SearchProductsRequest = {
  price?: number;
  page: number;
  category: string;
  search: string;
  sort: string;
};
type NewProductRequest = {
  FormData: FormData;
  id: string;
};

type ProductDetailRequest = {
  id: string;
  userId: string;
};

type UpdateProductRequest = {
  userId: string;
  productId: string;
  formData: FormData;
};

type DeleteProductRequest = {
  userId: string;
  productId: string;
};

type StatsResponse = {
  success: boolean;
  stats: Stats;
};

type PieResponse = {
  success: boolean;
  charts: Pie;
};

type BarResponse = {
  success: boolean;
  charts: Bar;
};

type LineResponse = {
  success: boolean;
  charts: Line;
};

type CustomError = {
  status: number;
  data: {
    message: string;
    success: boolean;
  };
};

type NewOrderRequest = {
  orderItems: CartItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  user: string;
};

type UpdateOrderRequest = {
  userId: string;
  orderId: string;
};

type DeleteUserRequest = {
  userId: string;
  adminId: string;
};

type OrderDetailsRequest = {
  userId: string;
  orderId: string;
};

export type {
  MessageResponse,
  UserResponse,
  ProductResponse,
  CustomError,
  CategoriesResponse,
  SearchProductsResponse,
  SearchProductsRequest,
  NewProductRequest,
  ProductDetailResponse,
  ProductDetailRequest,
  UpdateProductRequest,
  DeleteProductRequest,
  AdminProductsResponse,
  NewOrderRequest,
  AllOrdersResponse,
  OrderDetailsResponse,
  UpdateOrderRequest,
  OrderDetailsRequest,
  AllUsersResponse,
  DeleteUserRequest,
  StatsResponse,
  PieResponse,
  BarResponse,
  LineResponse,
};
