import React, {Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AppState, {AppContext} from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';
import UserDetail from '../userDetail/UserDetail';
import { SearchContext } from '../../context/search/searchContext';




const CountyList = () => {


  const searchContext = useContext(SearchContext);
  const {data, setSearchState} = searchContext;
  const {searchCounty} = data;
  

    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);

    const { users, getUsers, updateUser} = userContext; 
    const {isAuthenticated, user} = authContext;
    const {appState, setAppState} = appContext;

    const {currentUser} = appState;

    const [countyState, setCounty] = useState({county:searchCounty});
    const{county} = countyState;
  

    const userNavigate = useNavigate();
    
    useEffect(() => {
     
     authContext.loadUser();
     
     
    });



    const onValueChange = e => {
      
      setCounty({...countyState, [e.target.name]:e.target.value});
    }


    const submitCounty = () => {
     // updateUser({...user,county:county});
    setSearchState({...data, searchCounty:county});
      userNavigate("/");
    }

  return (
  
  <Fragment>
    
    
   <h2 className="topMargin mb-4">Select County to Search</h2>
   
    <div className="radioSpace"></div>
    
   <input
    className="radioControl"
    type="radio"
    value="SB"
    name="county"
    checked={county === "SB"}
    onChange={onValueChange}/> San Bernardino
    
    <div className="radioSpace"></div>
    
    <input
    className="radioControl"
    type="radio"
    value="RIV"
    name="county"
    checked={county === "RIV"}
    onChange={onValueChange}/> Riverside
    <div className="radioSpace"/>
    

    

    <input
    className="radioControl"
    type="radio"
    value="FRESNO"
    name="county"
    checked={county === "FRESNO"}
    onChange={onValueChange}/> Fresno

<div className="radioSpace"></div>

<button className="btn-primary btn" onClick={() =>{submitCounty()}}>Save</button>
  </Fragment>

  )
};

export default CountyList;