import  { configureStore} from '@reduxjs/toolkit'
import User from './userSlice'
import Products from './productSlice'




const store = configureStore({
    reducer: {
        User,
        Products
    }
})



export default store;