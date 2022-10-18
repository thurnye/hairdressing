import  {createSlice} from '@reduxjs/toolkit'
// import store from './index'

const SearchFieldData = {
    SearchText : ''
}

const search = createSlice({
    name: 'SearchProduct',
    initialState: SearchFieldData,
    reducers: {
        // all all recipes from the database
        getSearchText(state, action){
            console.log('R', action)
                state.SearchText = action.payload
       }

    }
})


// actions
export default search.reducer;
export const {
    getSearchText
} = search.actions


//selectors
export const searchTextSelector = (state) => state.Search.SearchText;
