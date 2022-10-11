import  {createSlice} from '@reduxjs/toolkit'
import { getProducts } from '../api/request'
import {SUCCESS_STATUS, NO_CONTENTS} from '../common/variables'
// import store from './index'

const ProductData = {
    products: [],
    brand: [],
    categories:[],
    selectedCategory: '',
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
                    const {brands, categories, products, dataLength} = action.payload.data
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
        getAllCategories(state, action){
                if( action.payload.status === SUCCESS_STATUS){
                    const {categories } = action.payload.data
                    state.categories = categories
                }
                if(action.payload.status !== SUCCESS_STATUS){
                    state.categories = []
                }
       },

       getSingleProduct(state, action){
           const product = action.payload.data
           state.singleProduct = product
       },

       getSelectedcategory(state, action){
            state.selectedCategory = action.payload
       }

    }
})


// actions
export default products.reducer;
export const {
    getAllProducts, 
    getSingleProduct, 
    getSelectedcategory,
    getAllCategories
} = products.actions


//selectors
export const productsSelector = (state) => state.Products.products;
export const productsLoadingSelector = (state) => state.Products.loadingProduct;
export const categoriesSelector = (state) => state.Products.categories;
export const categorySelector = (state) => state.Products.selectedCategory;
