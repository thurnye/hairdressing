import  { configureStore} from '@reduxjs/toolkit'
import User from './userSlice'
import Products from './productSlice'
import Search from './searchSlice'
import Categories from './categorySlice'




const store = configureStore({
    reducer: {
        User,
        Products,
        Categories,
        Search
    }
})



export default store;