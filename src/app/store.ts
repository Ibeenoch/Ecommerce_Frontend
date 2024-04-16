import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import  productReducer  from '../features/ProductList/ProductSlice';
import cartReducer from '../features/cart/cartSlice'
import wishReducer from '../features/wishlist/wishListSlice'
import authReducer from '../features/auth/authSlice'
import checkoutReducer from '../features/checkout/checkoutSlice';
import orderReducer from '../features/order/orderSlice';

const persistConfig = {
  key: 'root',
  storage,
  blackList: ['auth', 'checkout']
}

const reducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  wishlist: wishReducer,
  auth: authReducer,
  checkout: checkoutReducer,
  order: orderReducer
})

const persistedReducer = persistReducer(persistConfig, reducers)


export const store = configureStore({
  reducer: persistedReducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
