import  {createSlice} from '@reduxjs/toolkit'
import {SUCCESS_STATUS, NO_CONTENTS} from '../common/variables'
// import store from './index'

const ProductData = {
    products: [],
    brands: [],
    loadingProducts: true,
    singleProduct: [],
}

const products = createSlice({
    name: 'recipes',
    initialState: ProductData,
    reducers: {
        // all all recipes from the database
        getAllProducts(state, action){
                if( action.payload.status === SUCCESS_STATUS){
                    const {products, dataLength} = action.payload.data
                    state.loadingProduct = false;
                    state.products = products;
                    localStorage.setItem("ItemNumber", dataLength)
                }
                if(action.payload.status !== SUCCESS_STATUS){
                    state.loadingProduct = true;
                    state.products = [];
                }
       },
        getSingleProduct(state, action){
           const product = action.payload.data
           state.singleProduct = product
       },
       getAllBrands(state, action){
            state.brands = action.payload.brands
       }

    }
})


// actions
export default products.reducer;
export const {
    getAllProducts, 
    getSingleProduct,
    getAllBrands,
} = products.actions


//selectors
export const productsSelector = (state) => state.Products.products;
export const productsLoadingSelector = (state) => state.Products.loadingProduct;
export const brandsSelector = (state) => state.Products.brands;
