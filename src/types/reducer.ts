import { CartItem, User, ShippingInfo } from "./types";

interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

interface CartReducerInitialState {
  loading: boolean;
  cartItems: CartItem[];
  subtotal: number;
  tax: number;
  shippingCharges: number;
  discount: number;
  total: number;
  shippingInfo: ShippingInfo;
}

export type { UserReducerInitialState, CartReducerInitialState };
