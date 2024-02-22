type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role?: string;
  dob: string;
  _id: string;
};

type Product = {
  title: string;
  category: string;
  price: number;
  stock: number;
  picture: string;
  _id: string;
};

type ShippingInfo = {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
};

type CartItem = {
  productId: string;
  picture: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
};

type OrderItem = Omit<CartItem, "stock"> & {
  _id: string;
};

type Order = {
  orderItems: OrderItem[];
  shippingInfo: ShippingInfo;
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  status: string;
  user: {
    name: string;
    userId: string;
  };
  _id: string;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};

type LatestTransaction = {
  _id: string;
  amount: number;
  discount: number;
  quantity: number;
  status: string;
};

type ChangePercent = {
  ProductPercentage: number;
  UserPercentage: number;
  OrderPercentage: number;
};

type Stats = {
  categoryCountPercentage: Record<string, number>[];
  change: ChangePercent;
  count: CountAndChange;
  charts: {
    OrderMonthsCount: number[];
    OrderMonthlyRevenue: number[];
  };
  UsersRatio: {
    male: number;
    female: number;
  };
  transactions: LatestTransaction[];
};

type Pie = {
  orderFulfillment: {
    processing: number;
    shipped: number;
    delivered: number;
  };
  ProductsCategories: [
    {
      laptop: number;
    },
    {
      mobile: number;
    }
  ];
  StockAvailability: {
    ProductsInStock: number;
    ProductsOutOfStock: number;
  };
  revenueDistribution: {
    ProductionCost: number;
    discount: number;
    burnt: number;
    marketingCost: number;
    netMargin: number;
  };
  Users: {
    admins: number;
    customers: number;
  };
  UsersAgeGroup: {
    teen: number;
    adult: number;
    old: number;
  };
};

type Bar = {
  products: number[];
  users: number[];
  orders: number[];
};

type Line = {
  products: number[];
  users: number[];
  discount: number[];
  revenue: number[];
};

export type {
  User,
  Product,
  ShippingInfo,
  CartItem,
  OrderItem,
  Order,
  Stats,
  CountAndChange,
  LatestTransaction,
  Pie,
  Bar,
  Line,
};
