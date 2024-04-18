import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { addToCart, fetchAllUsersCart, updateCartQty } from './cartApi';
import * as api from './cartApi';
import  CartInterface  from './cartInterface'
import { act } from '@testing-library/react';


const checkItem = JSON.parse(localStorage.getItem('cart') as any);

const initialState: CartInterface = {
  carts: checkItem !== null ? checkItem : [],
  status: ''
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAllUsersCartAsync = createAsyncThunk('cart/fetchAllUsersCart',   async (_, thunkAPI) => {
    try {
        const response = await api.fetchAllUsersCart();
          return response;
      
    } catch (error) {
        const message = thunkAPI.rejectWithValue(error)
    }
  }
);

export const addtocart = createAsyncThunk('cart/createcart', async(dataItem: any, thunkAPI) => {
  try {
    const addToast = dataItem.addToast;
    const data = dataItem.data;
    const res = await api.addToCart(data, addToast)
      return res;
         
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const updateQtyCart = createAsyncThunk('cart/updateCart', async(dataItems: any, thunkAPI) => {
    try {
      const id = dataItems.id;
      const data = dataItems.data;
        const response = await api.updateCartQty(id, data);
        return response;
    } catch (error) {
        const message = thunkAPI.rejectWithValue(error)
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersCartAsync.fulfilled, (state, action) => {
        if(action.payload === null || action.payload === undefined){
        }else{
          state.status = 'success'
          state.carts = action.payload;
        }
        
      })
      .addCase(fetchAllUsersCartAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addtocart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtocart.fulfilled, (state, action) => {
        if(action.payload === undefined){
          console.log('none')
        }else{
            state.carts.push(action.payload);  
        }
        
      })
      .addCase(addtocart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateQtyCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQtyCart.fulfilled, (state, action) => {
       const findItem = state.carts.findIndex((item: any) => item.id === action.payload.id);
       state.carts[findItem] = action.payload;
      })
      .addCase(updateQtyCart.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const {  } = cartSlice.actions;
export const selectAllCart = (state: RootState) => state.cart;
export const selectAllCartItems = (state: RootState) => state.cart.carts;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default cartSlice.reducer;
