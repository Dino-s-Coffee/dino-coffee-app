import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import userReducer from '../features/user/userSlice'
import favoriteReducer from '../features/favorite/favoriteSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    favorite: favoriteReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
