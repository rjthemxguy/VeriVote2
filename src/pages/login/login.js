import React, {useState, useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {login, reset, loadUser} from '../../features/auth/authSlice';


const Login = () => {

const {user, isLoading, isError, isSuccess, isActive,message, token} = useSelector(
    (state) => state.auth)

const dispatch = useDispatch();


// Navigate after login  
const navigate = useNavigate();



// Toast error finctions

const emptyFields = () => toast.error("Please complete all fields!", {position: "top-center"});

useEffect(()=>{
  if(isError) {
      toast.error(message);
      dispatch(reset())
           
  }

 if(isSuccess){
    dispatch(loadUser())
    navigate('/')

   
 }

 



},[isSuccess])



// Create state for form
const [formData, setForm] = useState({
    email: "",
    password: ""


});


const {email, password} = formData;

const onChange = e => setForm({...formData, [e.target.name]:e.target.value});

const onSubmit = e => {
    e.preventDefault();
  
    if (email==='' || password===''){
        toast.error("Please fill all fields")
              
    }else {
      const userData = {
        email,
        password
      }

      dispatch(login(userData));
   
     
    }

}

  return <div className="topMargin smallWidth">
      <h1>Login</h1>

      <form onSubmit ={onSubmit}>
       
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
       
       <input type="submit" value ="Login" className="btn btn-primary btn-block mt-4"/>
      </form>
        
        <ToastContainer/>
  </div>;
};

export default Login;
