import React, {Fragment, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import { AppContext } from '../../context/app/appContext';
import Switch from "react-switch";
import UserContext from '../../context/user/userContext';

const UserDetail = (route) => {

const navigate = useNavigate();

const appContext = useContext(AppContext);
const userContext = useContext(UserContext);

const {updateUser} = userContext;
const {appState, setAppState} = appContext;
const {currentUser} = appState;

const buttonClicked = () => {

 
 currentUser.isActive = !currentUser.isActive;
 setAppState({currentUser:currentUser});
 
 
}

const updateUserClick = (user) => {

  
updateUser(user);
navigate("/ListUsers")
}




  return (
  <Fragment>
      <h3 className="topMargin">User Detail</h3>
      <h1 className="mt-4 text-primary">{currentUser.name}</h1>
      <p>{currentUser.email}</p>
      <Switch onChange={() => {buttonClicked()}} checked={currentUser.isActive} />
      <br/>
      <button className="btn btn-primary mt-4" onClick={() => {updateUserClick(currentUser)}}>Update User</button>


  </Fragment>
)};

export default UserDetail;
