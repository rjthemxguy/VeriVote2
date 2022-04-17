import React, {Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser, setCounty } from '../../features/auth/authSlice';

const CountyList = () => {


  const dispatch = useDispatch();
  const {searchCounty, isLoading, user} = useSelector((state) => state.auth)

    const [countyState, setCountyState] = useState({county:searchCounty});
    const {county} = countyState;

    const userNavigate = useNavigate();
    
    
    const onValueChange = e => {
      
      setCountyState({...countyState, [e.target.name]:e.target.value});
    }


    useEffect(()=>{

      dispatch(loadUser());
  
    },[])

    useEffect(()=>{
      if(!isLoading && !user.isActive) {
        
             userNavigate('/notActive')
        
 }

},[isLoading])


    const submitCounty = () => {
     
      dispatch(setCounty(county));
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