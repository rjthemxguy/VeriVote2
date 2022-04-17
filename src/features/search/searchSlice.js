import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    fName:"",
    lName:"",
    houseNum:"",
    street:"",
    city:"",
    isError:false,
    isSuccess:false,
    isLoading:true,
    message:""
}

export const setSearch = createAsyncThunk('search/setSearch', async(searchData) => {

    return searchData;

});


export const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers: {
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
            state.fName = ""
            state.lName = ""
            state.houseNum= ""
            state.street= ""
            state.city =""
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(setSearch.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(setSearch.fulfilled, (state,action) => {
            state.isLoading = false
            state.fName = action.payload.fName
            state.lName = action.payload.lName
            state.houseNum = action.payload.houseNum
            state.street = action.payload.street
            state.city = action.payload.city
        })
    }


})

export const {reset} = searchSlice.actions
export default searchSlice.reducer