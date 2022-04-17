import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import voterService from '../voter/voterService';




const initialState = {
    voters: [],
    isError:false,
    isSuccess:false,
    isLoading:true,
    message:""
    
}




export const getVoters = createAsyncThunk('voters/getVoters', async(searchData) => {

    try {
        
        return await voterService.getVoters(searchData);

    } catch (error) {
        const message = (error.response.data.msg)
        
        
        
    }

});




export const voterSlice = createSlice({
    name:'voter',
    initialState,
    reducers: {
        reset:(state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
          
            

        }

       
    },
    extraReducers: (builder) => {
        builder
           
           
            .addCase(getVoters.pending, (state) =>{
                state.isLoading = true;
            })

            .addCase(getVoters.fulfilled, (state, action) =>{
                
                state.isSuccess = true
                state.isLoading = false
                state.voters = action.payload
            })
            .addCase(getVoters.rejected, (state, action) =>{
                
                state.isSuccess = true
                state.isLoading = false
                state.message = action.payload
            })


           
    }

})

export const {reset} = voterSlice.actions
export default voterSlice.reducer
