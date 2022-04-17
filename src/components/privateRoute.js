import React, {useContext, useEffect,Fragment, useReducer} from 'react';
import {Route, Navigate, Outlet} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux';

const PrivateRoute = () => {

const {token, isActive} = useSelector(
    (state) => state.auth)


  
  

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return token ? <Outlet /> : <Navigate to="/login" />;
  
}

export default PrivateRoute;
