import  {createSlice} from '@reduxjs/toolkit'
import { getProducts } from '../api/request'
import {SUCCESS_STATUS, NO_CONTENTS} from '../common/variables'
// import store from './index'

const ProductData = {
    products: [],
    brand: [],
    loadingProducts: true,
    loadingProduct: true,
    singleProduct: [],
}

const products = createSlice({
    name: 'recipes',
    initialState: ProductData,
    reducers: {
        // all all recipes from the database
        getAllProducts(state, action){
                if( action.payload.status === SUCCESS_STATUS){
                    const {brands, products, dataLength} = action.payload.data
                    state.brand = brands;
                    state.loadingProduct = false;
                    state.products = products;
                    localStorage.setItem("ItemNumber", dataLength)
                }
                if(action.payload.status !== SUCCESS_STATUS){
                    state.brand = [];
                    state.loadingProduct = true;
                    state.products = [];
                }
       },

       getSingleProduct(state, action){
           const product = action.payload.data
           state.singleProduct = product
       }
    }
})


// actions
export default products.reducer;
export const {getAllProducts, getSingleProduct} = products.actions


//selectors
export const productsSelector = (state) => state.Products.products;

export const productsLoadingSelector = (state) => state.Products.loadingProduct;
