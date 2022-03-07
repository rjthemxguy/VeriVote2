import React, {useState, useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate} from "react-router-dom";


const Register = () => {

let navigate = useNavigate();

const authContext = useContext(AuthContext);


const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""

});

const emptyFields = () => toast.error("Please complete all fields!", {position: "top-center"});
const passwordError = () => toast.error("Passwords do not match!", {position: "top-center"});
const userExists = () => toast.error("User already exists!", {position: "top-center"});
const passwordLentgh = () => toast.error("Please enter a password with 6 or more characters!", {position: "top-center"});


const {register, error, clearErrors, isAuthenticated} = authContext;

const {name, email, password, password2, isActive, seeParty} = user;

useEffect(() => {

if (isAuthenticated) {
    navigate("/");
}

if (error ==="User already exists") {
userExists();
}


clearErrors();

}, [error, isAuthenticated]);

const onChange = e => setUser({...user, [e.target.name]:e.target.value});

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
        register({
            name,
            email,
            password
            
        })
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
