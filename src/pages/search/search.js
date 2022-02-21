import React, {Fragment, useContext, useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import { SearchContext } from '../../context/search/searchContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../../context/auth/authContext';
import { AppContext, AppState } from '../../context/app/appContext';






function Search() {

    let navigate = useNavigate();

    const appContext = useContext(AppContext);
    const authContext = useContext(AuthContext);
    const {appState, setAppState} = appContext;
    const {currentUser} = appState;
   
    const {user,loading, error, state} = authContext;

    
    

    useEffect(() => {
      authContext.loadUser();
      
          
     

    },[authContext.isAuthenticated]);

   
   

    const notify = () => toast.error("Please enter some data!", {position: "top-center"});

    const searchContext = useContext(SearchContext);

    const {data, setSearchState} = searchContext;
     
    const {fName, lName, houseNum, street, city, searchCounty} = data;

    
  
    
   const checkForm = (e) => {
     let isBlank = true;

     if(e.target.lName.value !== "") {
      isBlank = false
    }

    if(e.target.fName.value !== "") {
      isBlank = false
    }

    if(e.target.houseNum.value !== "") {
      isBlank = false
    }

    if(e.target.street.value !== "") {
      isBlank = false
    }

    if(e.target.city.value !== "") {
      isBlank = false
    }

    return isBlank;
   }

    const onChange = e => setSearchState({...data, county:searchCounty, [e.target.name]: e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();

    if(user.isActive) {
         
      if(checkForm(e) === true) {
        notify();
       }
       else {
       navigate("/results");
       }

      }else {
      navigate("/notActive");
      }

        
        

    }
   
  return (
    <Fragment>

        
     <div className="form-group container pt-4 topMargin" >

    Search County: {searchCounty}

        <form onSubmit={onSubmit}>
            <input type="text"
            class="form-control mt-4"
            placeholder="Last Name"
            name="lName"
            value={lName}
            onChange = {onChange}/>

            <input type="text"
            class="form-control mt-4"
            placeholder="House Number"
            name="houseNum"
            value={houseNum}
            onChange = {onChange}/>

            <input type="text"
            class="form-control mt-4"
            placeholder="First Name"
            name="fName"
            value={fName}
            onChange = {onChange}/>

            <input type="text"
            class="form-control mt-4"
            placeholder="Street"
            name="street"
            value={street}
            onChange = {onChange}/>

            <input type="text"
            class="form-control mt-4"
            placeholder="City"
            name="city"
            value={city}
            onChange = {onChange}/>

            <div>
                <input type="submit" value="Search" className="btn btn-primary mt-4"/>
            </div>
        </form>  
      </div>

     <ToastContainer/>
    </Fragment>
    )
}

export default Search;
