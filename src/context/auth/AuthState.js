import React, {useReducer, useContext} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../setAuthToken';

import {REGISTER_SUCCESS,
        REGISTER_FAIL,
        USER_LOADED,
        AUTH_ERROR,
        LOGIN_SUCCESS,
        LOGIN_FAIL,
        LOGOUT,
        CLEAR_ERRORS} from '../../types';
import { BsNutFill } from 'react-icons/bs';

const AuthState = (props) => {



    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: {name:"RJ"},
        isActive: false,
        searchCounty: "SB",
        isAdmin: false,
        seeParty: false

    }

    const [state, dispatch] = useReducer(authReducer, initialState);



// Actions go here


// LOAD USER

const loadUser = async () => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

 try {
     const res = await axios.get('http://139.59.170.27:5000/api/auth');

    
     dispatch({
         type: USER_LOADED,
         payload:res.data
     })

 } catch (err) {

    console.log("ERR: " + err.msg);
    dispatch({type: AUTH_ERROR});
     
 }  
  

};



// REGISTER USER

const register = async formData => {

    formData.isActive = state.isActive;
    formData.county = state.county;
    formData.isAdmin = state.isAdmin;
    formData.seeParty = state.seeParty;

    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
try {

    const res = await axios.post('http://139.59.170.27:5000/api/users', formData, config);

    dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })

    loadUser();
    
} catch (err) {
    dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
    })
}

}

// LOG IN

const login = async formData => {
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
try {

    const res = await axios.post('http://139.59.170.27:5000/api/auth', formData, config);

    
    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    })

    loadUser();
    
} catch (err) {
    dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg
    })
}

}

//LOG OUT 

const logout = () => {
    dispatch({type: LOGOUT});
}

// CLEAR ERRORS

const clearErrors = () => {dispatch({type:CLEAR_ERRORS})}



    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            isLoading: state.isLoading,
            error: state.error,
            user: state.user,
            isActive: state.isActive,
            seeParty: state.seeParty,
            searchCounty: state.searchCounty,
            register,
            clearErrors,
            loadUser,
            login,
            logout

        }}
        >

            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;