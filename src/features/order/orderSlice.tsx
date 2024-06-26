import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as api from "./OrderApI";
import { act } from "@testing-library/react";

export interface userState {
  orders: any;
  status: "success" | "loading" | "failed" | "idle";
}

const initialState: userState = {
  orders: [],
  status: "idle",
};

export const getAllOrders = createAsyncThunk(
  "/order/all",
  async (token: any) => {
    try {
      const res = await api.fetchAllOrder(token);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const orderUpdate = createAsyncThunk(
  "/order/update",
  async (data: any) => {
    try {
      const res = await api.updateAnOrder(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderPagination = createAsyncThunk(
  "/order/paginatate",
  async (data: any) => {
    try {
      const res = await api.fetchOrderPagination(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "/order/delete",
  async (data: any) => {
    try {
      const res = await api.deleteAnOrder(data);
      return res?.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers(builder) {
    builder
      .addCase(getAllOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(orderUpdate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(orderUpdate.fulfilled, (state, action) => {
        state.status = "success";
        const findIndex = state.orders.findIndex(
          (item: any) => item.id === action.payload.id
        );
        state.orders[findIndex] = action.payload;
      })
      .addCase(orderUpdate.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "success";
        const findIndex = state.orders.findIndex(
          (item: any) => item.id === action.payload.id
        );
        state.orders.splice(findIndex, 1);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getOrderPagination.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getOrderPagination.fulfilled, (state, action) => {
        state.status = "success";
        if (action.payload !== undefined) {
          state.orders = action.payload;
          console.log("ordrers ", state.orders);
        }
      })
      .addCase(getOrderPagination.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;
