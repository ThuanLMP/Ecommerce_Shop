import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './productsSlice'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'
export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer
  },
})