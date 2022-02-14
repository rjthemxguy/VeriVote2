import { GET_VOTERS } from "../../types";

export default (state, action) => {

switch(action.type) {

    case GET_VOTERS:
        return {
        ...state,
        voters:action.payload
        }
}

}