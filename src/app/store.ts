import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  productReducer  from '../features/ProductList/ProductSlice';
import cartReducer from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
