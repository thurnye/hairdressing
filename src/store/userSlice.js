import  {createSlice} from '@reduxjs/toolkit'


const loggedInUser = {
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: loggedInUser,
    reducers: {
       login(state, action){
        console.log('state', action.payload)
           state.user = action.payload;
       },
       logout(state){
           state.user = null
       } 
    }
})

export default userSlice.reducer;
export const userSelector = (state) => state.User.user;
export const {login, logout} = userSlice.actions