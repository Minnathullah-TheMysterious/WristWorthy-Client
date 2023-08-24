import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null
}

export const authDetailsAsync = createAsyncThunk('auth/authDetails', async()=>{
    const userFromLocalStorage = await JSON.parse(localStorage.getItem('user'))
    return userFromLocalStorage
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(authDetailsAsync.fulfilled, (state,action)=>{
            state.user = action.payload
        })
    }
})

export default authSlice.reducer
