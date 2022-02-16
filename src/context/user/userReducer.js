import { GET_USERS, UPDATE_USER } from "../../types"

export default (state, action) => {

switch(action.type) {

    case GET_USERS:
    
        return {
        ...state,
        users:action.payload
        }

    case UPDATE_USER:
        return {
            ...state,
            users: state.users.map(user => user._id === action.payload._id ? action.payload: user),
            isLoading:false
        }        
}

}