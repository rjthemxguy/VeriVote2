import React, {useReducer, useContext} from 'react';

import UserContext from './userContext';
import userReducer from './userReducer';
import AppContext from '../app/appContext';

import { GET_USERS,
         USER_ERROR,
         UPDATE_USER,
         UPDATE_ERROR    } from '../../types';
import axios from 'axios';

const UserState = props =>{


    const initialState = {

        users : [{}],
        isLoading:false
        
    };

    const [state,dispatch] = useReducer(userReducer, initialState);
    const {isLoading} = state;

    //const appContext = useContext(AppContext);
    
    //const {appState, setAppState} = appContext;

  

    // GET USERS

    const getUsers = async () => {
    
        const query = `http://139.59.170.27:5000/api/users`;
          
        try {

         

          const users = await axios.get(query);
          
                dispatch({
                    type: GET_USERS,
                    payload: users.data
                });

        } catch (err) {
            dispatch({
                type:USER_ERROR,
                payload: err.response.msg
            });
        }
    };

    const updateUser = async (currentUser) => {

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
     
                
        try {
           
          const user = await axios.put(`http://139.59.170.27:5000/api/users/${currentUser._id}`, currentUser, config);
          
               dispatch({
                    type: UPDATE_USER,
                    payload: user.data
                });

        } catch (err) {
            console.log("Error: " + err.message);
            dispatch({
                type:UPDATE_ERROR,
                payload: err.response.msg
            });
        }
    };



    return (
        <UserContext.Provider value = {{
            users:state.users,
            getUsers,
            updateUser, 
            isLoading
        }}>
            {props.children}

        </UserContext.Provider>
    )
};

export default UserState;