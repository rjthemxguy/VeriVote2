import React, {Fragment, useState, useEffect} from 'react';
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import {getVoters} from '../../features/voter/voterSlice';
import {setCounty, loadUser} from '../../features/auth/authSlice';






function Search() {

    let navigate = useNavigate();
   
    const dispatch = useDispatch();
    const {user, isLoading} = useSelector((state) => state.auth)
    

    const [searchData, setSearch] = useState({
      fName: "",
      lName: "",
      houseNum: "",
      street: "",
      city: ""
  
  });

  useEffect(()=>{

    dispatch(loadUser());

  },[])
  

    useEffect(()=>{
         if(!isLoading && !user.isActive) {
           
                navigate('/notActive')
           
    }

     
    },[isLoading])

    
   

    const notify = () => toast.error("Please enter some data!", {position: "top-center"});

  
        
    const {fName, lName, houseNum, street, city} = searchData;

    
  
    
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

    const onChange = e => setSearch({...searchData, [e.target.name]: e.target.value});

    const onSubmit = (e) =>{
        e.preventDefault();

    
         
      if(checkForm(e) === true) {
        notify();
       }

       dispatch(setCounty("FRESNO"))

      // else {
      // navigate("/results");
      // }

      //}else {
      //navigate("/notActive");
      //}
      
        

    
  }
   
  return (
    <Fragment>

        
     <div className="form-group container pt-4 topMargin" >

   

        <form onSubmit={onSubmit}>
            <input type="text"
            className="form-control mt-4"
            placeholder="Last Name"
            name="lName"
            value={lName}
            onChange = {onChange}/>

            <input type="text"
            className="form-control mt-4"
            placeholder="House Number"
            name="houseNum"
            value={houseNum}
            onChange = {onChange}/>

            <input type="text"
            className="form-control mt-4"
            placeholder="First Name"
            name="fName"
            value={fName}
            onChange = {onChange}/>

            <input type="text"
            className="form-control mt-4"
            placeholder="Street"
            name="street"
            value={street}
            onChange = {onChange}/>

            <input type="text"
            className="form-control mt-4"
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
