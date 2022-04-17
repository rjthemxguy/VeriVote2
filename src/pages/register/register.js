import React, {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {register, reset} from '../../features/auth/authSlice';
import { loadUser } from '../../features/auth/authSlice';



const Register = () => {

let navigate = useNavigate();


const [formData, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""

});




const emptyFields = () => toast.error("Please complete all fields!", {position: "top-center"});
const passwordError = () => toast.error("Passwords do not match!", {position: "top-center"});
const userExists = () => toast.error("User already exists!", {position: "top-center"});
const passwordLentgh = () => toast.error("Please enter a password with 6 or more characters!", {position: "top-center"});




const {user, isLoading, isError, isSuccess, message, token, isActive} = useSelector(
    (state) => state.auth)

const dispatch = useDispatch();

useEffect(()=>{
    if(isError) {
        toast.error(message);
       
        
    }

 if(isSuccess) {
     navigate('/')
 }
    

},[isSuccess])


const {name, email, password, password2} = formData;


const onChange = e => setForm({...formData, [e.target.name]:e.target.value});

const onSubmit = e => {
    e.preventDefault();

    if(name === '' || email === '' || password === '') {
        emptyFields();  
    }
    else if (password !== password2) {
        passwordError();
    }
    else if (password.length < 6 ) {
        passwordLentgh();
    }
    else {
       const userData = {
           name,
           email,
           password,
           isAdmin:false,
           isActive:false
           
       }

       dispatch(register(userData))
    }
   

}

  return <div className="topMargin smallWidth">
      <h1>Account Register</h1>

      <form onSubmit ={onSubmit}>
      <input type="text"
            className="form-control mt-4"
            placeholder="Name"
            name="name"
            value={name}
            onChange = {onChange}/>

            <input type="email"
            className="form-control mt-4"
            placeholder="Email"
            name="email"
            value={email}
            onChange = {onChange}/>

            <input type="password"
            className="form-control mt-4"
            placeholder="Password"
            name="password"
            value={password}
            onChange = {onChange}/>

            <input type="password"
            className="form-control mt-4"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange = {onChange}/>

         <button type="submit" value ="Register" className="btn btn-primary btn-large btn-block mt-4">Register</button>
      </form>
      <ToastContainer/>
  </div>;
};

export default Register;
