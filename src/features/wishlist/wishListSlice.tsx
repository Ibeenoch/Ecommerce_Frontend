import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import * as api from "./wishListApi";
import { act } from "@testing-library/react";

const checkItem = JSON.parse(localStorage.getItem("wishlist") as any);

const initialState = {
  wishlist: checkItem !== null ? checkItem : [],
  status: "",
};

export const fetchAllUsersWishListAsync = createAsyncThunk(
  "wishlist/fetchAllUserswishlist",
  async (_, thunkAPI) => {
    try {
      const response = await api.fetchAllUsersWishList();
      return response;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/createwishlist",
  async (dataItem: any, thunkAPI) => {
    try {
      const addToast = dataItem.addToast;
      const data = dataItem.data;
      const res = await api.addToWishList(data, addToast);
      return res;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
      return message;
    }
  }
);

export const updateQtyWishlist = createAsyncThunk(
  "wishlist/updatewishlist",
  async (dataItems: any, thunkAPI) => {
    try {
      const id = dataItems.id;
      const data = dataItems.data;
      const response = await api.updateWishListQty(id, data);
      return response;
    } catch (error) {
      const message = thunkAPI.rejectWithValue(error);
    }
  }
);

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersWishListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsersWishListAsync.fulfilled, (state, action) => {
        if (action.payload === null || action.payload === undefined) {
        } else {
          state.status = "success";
          state.wishlist = action.payload;
        }
      })
      .addCase(fetchAllUsersWishListAsync.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addToWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (action.payload === undefined) {
        } else {
          state.wishlist.push(action.payload);
        }
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(updateQtyWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQtyWishlist.fulfilled, (state, action) => {
        const findItem = state.wishlist.findIndex(
          (item: any) => item.id === action.payload.id
        );
        state.wishlist[findItem] = action.payload;
      })
      .addCase(updateQtyWishlist.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {} = wishListSlice.actions;
export const selectAllWishList = (state: RootState) => state.wishlist;

export default wishListSlice.reducer;
