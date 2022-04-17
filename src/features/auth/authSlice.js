import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';



const token =  localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user'))
const county = localStorage.getItem('county');

const initialState = {
    token: token ? token : null,
    user: user ? user : null,
    isError:false,
    isSuccess:false,
    isLoading:true,
    message:"",
    searchCounty: county ? county : "SB"
}

export const register = createAsyncThunk('auth/register', async(user, thunkAPI) => {

    try {
        return await authService.register(user)

    } catch (error) {
        const message = (error.response.data.msg)
        
        return thunkAPI.rejectWithValue(message)
    }

});

export const setCounty = createAsyncThunk('auth/setCounty', async(county, thunkAPI) => {

    try {
        return await authService.setCounty(county);

    } catch (error) {
        const message = (error.response.data.msg)
        
        return thunkAPI.rejectWithValue(message)
    }

});


export const loadUser = createAsyncThunk('auth/loadUser', async() => {

    try {
        
        return await authService.loadUser()

    } catch (error) {
        const message = (error.response.data.msg)
        
        
    }

});

export const logout = createAsyncThunk ('auth/logout', async () => {
    return await authService.logout();
})

export const login = createAsyncThunk('auth/login', async(user, thunkAPI) => {

    try {
        return await authService.login(user)

    } catch (error) {
        const message = (error.response.data.msg)
        
        return thunkAPI.rejectWithValue(message)
    }

});


export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers: {
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.user = null
            state.token = null

        }

       
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled,(state, action)=> {
                state.isLoading = false
                state.isSuccess = true 
                state.token = action.payload
               
            })
            .addCase(register.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.token = null

            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled,(state, action)=> {
                state.isLoading = false
                state.isSuccess = true 
                state.token = action.payload
                                           
            })
            .addCase(setCounty.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(setCounty.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.searchCounty = action.payload;
                
            })
            .addCase(loadUser.pending, (state) =>{
                state.isLoading = true;
            })

            .addCase(loadUser.fulfilled, (state, action) =>{
                
                state.isSuccess = true
                state.user = action.payload
                state.isAdmin = action.payload.isAdmin
                state.isActive = action.payload.isActive
                state.isLoading = false
            })


            .addCase(login.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
                state.token = null

            })
    }

})

export const {reset} = authSlice.actions
export default authSlice.reducer
