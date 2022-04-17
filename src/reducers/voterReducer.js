import { GET_VOTERS, SET_LOADING, VOTER_ERROR } from "../types";


const initialState = {
    voters: "",
    loading:false,
    error: null
}





export default (state = initialState, action) => {
    switch(action.type) {

        case SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case GET_VOTERS:
            return{
                ...state,
                voters:action.payload,
                loading:false
            }

        case VOTER_ERROR:
            console.error(action.payload);
            return{
                ...state,
                error: action.payload
            }

        default:
            return state;

    }
}