import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../../types/reducer";
import { CartItem } from "../../types/types";

const initialState: CartReducerInitialState = {
  loading: false,
  cartItems: [],
  subtotal: 0,
  tax: 0,
  shippingCharges: 0,
  discount: 0,
  total: 0,
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    state: "",
    pinCode: "",
  },
};

export const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.loading = true;
      const index = state.cartItems.findIndex(
        (i) => i.productId === action.payload.productId
      );

      if (index !== -1) state.cartItems[index] = action.payload;
      else state.cartItems.push(action.payload);
      state.loading = false;
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.cartItems = state.cartItems.filter(
        (i) => i.productId !== action.payload
      );
      state.loading = false;
    },

    calculatePrice: (state) => {
      const subtotal = state.cartItems.reduce(
        (prev, curr) => prev + curr.price * curr.quantity,
        0
      );
      state.subtotal = subtotal;
      if (state.subtotal) {
        state.shippingCharges = state.subtotal >= 1000 ? 0 : 200;
      }
      state.tax = Math.round(state.subtotal * 0.06);

      // Check if discount is applied, if not, set it to 0
      const discount = state.discount || 0;

      state.total =
        state.subtotal + state.shippingCharges + state.tax - discount;
    },

    applyDiscount: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        discount: action.payload,
      };
    },

    saveShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeCartItem,
  calculatePrice,
  applyDiscount,
  saveShippingInfo,
  resetCart,
} = cartReducer.actions;
