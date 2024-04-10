import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import  productReducer  from '../features/ProductList/ProductSlice';
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import checkoutReducer from '../features/checkout/checkoutSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const reducers = combineReducers({
  product: productReducer,
  cart: cartReducer,
  auth: authReducer,
  checkout: checkoutReducer,
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
