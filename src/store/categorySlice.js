import  {createSlice} from '@reduxjs/toolkit'
import {SUCCESS_STATUS, NO_CONTENTS} from '../common/variables'
// import store from './index'

const CategoriesData = {
    categories:[],
    selectedCategory: '',
    loadingCategories: true,
    activeComponent: 'Home'
}

const categories = createSlice({
    name: 'categories',
    initialState: CategoriesData,
    reducers: {
       
        getAllCategories(state, action){
                if( action.payload.status === SUCCESS_STATUS){
                    const {categories } = action.payload
                    state.categories = categories
                }
                if(action.payload.status !== SUCCESS_STATUS){
                    state.categories = []
                }
       },
       getSelectedCategory(state, action){
            state.selectedCategory = action.payload
       },
       getActiveComponent(state, action){
            state.activeComponent = action.payload
       }

    }
})


// actions
export default categories.reducer;
export const {
    getSelectedCategory,
    getAllCategories,
    getActiveComponent
} = categories.actions


//selectors

export const categoriesSelector = (state) => state.Categories.categories;
export const categorySelector = (state) => state.Categories.selectedCategory;
export const activeComponentSelector = (state) => state.Categories.activeComponent;
