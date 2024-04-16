import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import * as api from './wishListApi';
import { act } from '@testing-library/react';


const checkItem = JSON.parse(localStorage.getItem('wishlist') as any);

const initialState = {
  wishlist: checkItem !== null ? checkItem : [],
  status: ''
};


export const fetchAllUsersWishListAsync = createAsyncThunk('wishlist/fetchAllUserswishlist',   async (_, thunkAPI) => {
    try {
        const response = await api.fetchAllUsersWishList();
        console.log('wishlist fetched: ', response)
          return response;
      
    } catch (error) {
        const message = thunkAPI.rejectWithValue(error)
    }
  }
);

export const addToWishlist = createAsyncThunk('wishlist/createwishlist', async(dataItem: any, thunkAPI) => {
  try {
    const addToast = dataItem.addToast;
    const data = dataItem.data;
    const res = await api.addToWishList(data, addToast)
    console.log('resfsra: ', res)
      return res;
         
  } catch (error) {
    const message = thunkAPI.rejectWithValue(error);
    return message;
  }
})

export const updateQtyWishlist = createAsyncThunk('wishlist/updatewishlist', async(dataItems: any, thunkAPI) => {
    try {
      const id = dataItems.id;
      const data = dataItems.data;
        const response = await api.updateWishListQty(id, data);
        return response;
    } catch (error) {
        const message = thunkAPI.rejectWithValue(error)
    }
  }
);

export const wishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
  
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersWishListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsersWishListAsync.fulfilled, (state, action) => {
        if(action.payload === null || action.payload === undefined){
          console.log('empty')
        }else{
          console.log('fetched all this wishlist: ', action.payload)
          state.status = 'success'
          state.wishlist = action.payload;
        }
        
      })
      .addCase(fetchAllUsersWishListAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if(action.payload === undefined){
          console.log('state is undefined')
        }else{
            console.log('it is an array')
            state.wishlist.push(action.payload);  
        }
        
      })
      .addCase(addToWishlist.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(updateQtyWishlist.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateQtyWishlist.fulfilled, (state, action) => {
       const findItem = state.wishlist.findIndex((item: any) => item.id === action.payload.id);
       state.wishlist[findItem] = action.payload;
      })
      .addCase(updateQtyWishlist.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const {  } = wishListSlice.actions;
export const selectAllWishList = (state: RootState) => state.wishlist;

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

export default wishListSlice.reducer;