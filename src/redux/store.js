import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from '../features/articleSlice'
import cartReducer from '../features/cartSlice'

const store = configureStore({
  reducer: {
    storearticles: articlesReducer, // states des articles
    storecart: cartReducer  // states de cart
  }
})

export default store
