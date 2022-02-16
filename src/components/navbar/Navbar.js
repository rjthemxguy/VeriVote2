import React, {Fragment, useState, useContext} from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';

import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import * as GrIcons from 'react-icons/gr';
import * as BiIcons from 'react-icons/bi';



const Navbar = () => {

const authContext = useContext(AuthContext);

const {isAuthenticated, logout, user} = authContext;



const [sidebar, toggleSidebar] = useState(false);

const showSidebar = () => 
{
    toggleSidebar(!sidebar);
}

const onLogout = () => {

    showSidebar();
    logout();

}


const guestLinks = (
    <Fragment>N
         <li onClick={showSidebar}><FaIcons.FaPencilAlt className="iconItem"/>
         <Link style={{textDecoration:'none'}} className="text-light" to='/register'>Register</Link></li>
         <li onClick={showSidebar}><BiIcons.BiLogInCircle className="iconItem"/>
            <Link style={{textDecoration:'none'}} className="text-light" to='/login'>Login</Link></li>
    </Fragment>
);

const authLinks = (
<Fragment>
        <li onClick={showSidebar}><FaIcons.FaSearch className="iconItem"/>
        <Link style={{textDecoration:'none'}} className="text-light" to='/'>Search</Link></li>
        <li onClick={showSidebar}><BsIcons.BsPeopleFill className="iconItem"/>
        <Link style={{textDecoration:'none'}} className="text-light" to='/countyList'>Select County</Link></li>

        
        <li onClick={showSidebar}><BsIcons.BsFillCheckCircleFill className="iconItem"/>
            <Link style={{textDecoration:'none'}} className="text-light" to='/listUsers'>Approve Users</Link></li>
        <li onClick={onLogout}><BiIcons.BiLogOutCircle className="iconItem"/>Logout</li>

</Fragment>

);


    return (
        <Fragment>
            
                   
            <div className="container-fluid bg_navy navContainer fixed-top text-start">
                
                <FaIcons.FaBars className="iconLg mt-3" onClick={showSidebar}/>
                <div className="container">
                    <div className="row pt-2 pb-2">
                        <div className="col-md-6 text-center text-md-start"></div>
                        <div className="col-md-6 text-end">
                            
                                
                                {/*<Link style={{textDecoration:'none'}} className="text-light" to='/about'>About</Link>*/}
                            

                        </div>
                    </div>
                </div>
            </div>

            <div className={sidebar ? "sidebar" : "no-sidebar"}> 
            <div className="closeDiv"><FaIcons.FaWindowClose className="iconItem" onClick={showSidebar}/></div>
                <ul className="mt-4 sideBarItems">
                {isAuthenticated ? authLinks : guestLinks}    
                </ul>
            </div>
           
        </Fragment>
    )
}



export default Navbar