import React, {Fragment, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AppState, {AppContext} from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/user/userContext';
import UserDetail from '../userDetail/UserDetail';
import NoAdmin from '../../components/noAdmin/NoAdmin';



const ListUsers = () => {

    const userContext = useContext(UserContext);
    const authContext = useContext(AuthContext);
    const appContext = useContext(AppContext);

    const { users, getUsers} = userContext; 
    const {isAuthenticated, user} = authContext;
    const {appState, setAppState} = appContext;

    const {currentUser} = appState;

    const userNavigate = useNavigate();
    
    useEffect(() => {
      console.log("LOAD USER 1");
     userContext.getUsers();
     authContext.loadUser();
    
     
     
    },[]);

    useEffect(() => {
      console.log("LOAD USER 2");
     
    
    
     
     
    });


    const showDetail = (user) => {
      setAppState({currentUser:user});
     
      userNavigate('/userDetail');
    }
    

    const UserList = () => users.map(user => (<Fragment><div className="divRow  mb-4" onClick={() => {showDetail(user)}}><h3>{user.name}</h3>
                                                {user.email} - 
                                                
                                                {user.isActive ? <span className="activeClass"> Active</span> :
                                                <span className="notActiveClass"> Not Active</span> }
                                                </div>
                                               
                                                </Fragment> ));

   


   

    
  return (
  


    


  <Fragment>
    
    

    <h1 className="topMargin mb-4">Users</h1>

    
    
    {user.isAdmin ?  <UserList className="topMargin"/> : <NoAdmin/>}
    



  </Fragment>

  )
};

export default ListUsers;




