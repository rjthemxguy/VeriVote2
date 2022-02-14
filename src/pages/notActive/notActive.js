import React ,  {Fragment} from 'react';
import { useNavigate } from 'react-router-dom';


const NotActive = () => {

const navigate = useNavigate();

const backToSearch = () => {
  navigate('/');
}

  return (
        <Fragment>
            <h2 className="topMargin">You are registered but need to be activated</h2>

            <h2>Please contact your supervisor for activation</h2>

            <button className="btn btn-primary mt-4" onClick={() => {backToSearch()}} >Search</button>

        </Fragment>

  )
};

export default NotActive;