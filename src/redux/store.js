import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../features/articleSlice'
import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'

const store = configureStore({
  reducer: {
    storearticles: articlesReducer, // states des articles
    storecart: cartReducer,  // states de cart
    auth: authReducer  // les states des auth stockés en auth
  }
})

export default store