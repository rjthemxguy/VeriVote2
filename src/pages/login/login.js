import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {


// Navigate after login  
const navigate = useNavigate();

// Get Auth context
const authContext = useContext(AuthContext);

// Toast error finctions
const invalidCredentials = () => toast.error("Invalid Credentials!", {position: "top-center"});
const userNotFound = () => toast.error("User Not Found!", {position: "top-center"});
const emptyFields = () => toast.error("Please complete all fields!", {position: "top-center"});

// Deconstruct Auth context
const {login, error, clearErrors, isAuthenticated} = authContext;

// Create state for form
const [user, setUser] = useState({
    email: "",
    password: ""


});

// Hook for errors and authentication
useEffect(() => {

  // Go to main page if authenticated
  if (isAuthenticated) {
      navigate("/");
  }
  
  if (error ==="Invalid Credentials") {
  invalidCredentials();
  }

  if (error ==="User not found") {
    userNotFound();
    }
    
   
  clearErrors();
  
  }, [error, isAuthenticated]);
  


const {email, password} = user;

const onChange = e => setUser({...user, [e.target.name]:e.target.value});

const onSubmit = e => {
    e.preventDefault();
  
    if (email==='' || password===''){
        emptyFields();
              
    }else {
      login({
        email,
        password
      })
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
