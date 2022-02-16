import React, {Fragment} from 'react'
import {useNavigate} from 'react-router-dom';







const NoAdmin = () => {

    const navigate = useNavigate();

    const backToSearch = () => {
        navigate("/");
        }

  return (
    <Fragment>

    <h2 className="topMargin">You must be an Admin to use this function!</h2>
    <button className="btn btn-primary mt-4" 
        onClick={()=>{backToSearch()}}>Back to Search</button>


    </Fragment>
  )
}

export default NoAdmin