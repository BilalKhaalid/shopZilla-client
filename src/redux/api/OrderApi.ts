import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AllOrdersResponse,
  MessageResponse,
  NewOrderRequest,
  OrderDetailsRequest,
  OrderDetailsResponse,
  UpdateOrderRequest,
} from "../../types/Api";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/order/`,
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    newOrder: builder.mutation<MessageResponse, NewOrderRequest>({
      query: (order) => ({
        url: "new",
        method: "POST",
        body: order,
      }),
    }),
    updateOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "PUT",
      }),
    }),
    deleteOrder: builder.mutation<MessageResponse, UpdateOrderRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        method: "DELETE",
      }),
    }),
    myOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `my?id=${id}`,
        providedTags: ["orders"],
      }),
    }),
    allOrders: builder.query<AllOrdersResponse, string>({
      query: (id) => ({
        url: `all?id=${id}`,
        providedTags: ["orders"],
      }),
    }),
    orderDetails: builder.query<OrderDetailsResponse, OrderDetailsRequest>({
      query: ({ orderId, userId }) => ({
        url: `${orderId}?id=${userId}`,
        providedTags: ["orders"],
      }),
    }),
  }),
});

export const {
  useNewOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  useAllOrdersQuery,
  useMyOrdersQuery,
  useOrderDetailsQuery,
} = orderApi;
