import React, {Fragment, useContext, useEffect } from 'react'
import VoterContext from '../../context/voter/voterContext';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/search/searchContext';
import {AppContext} from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';
import * as FaIcons from 'react-icons/fa';




const VoterList = () => {

    const authContext = useContext(AuthContext);
    
    useEffect(() => {
     authContext.loadUser();

    }, [])

    const appContext = useContext(AppContext);
    
    const {appState, setAppState} = appContext;

    const {loading} = appState;
  
    const searchContext = useContext(SearchContext);

    const {data, setSearchState} = searchContext;

    const  voterContext = useContext(VoterContext);

    const { voters, getVoters } = voterContext;     


    const navigate = useNavigate();

    useEffect(() => {
        getVoters(data);
       
            //eslint-disable-next-line
    }, []);

    function newSearch(){
      setSearchState({fName:"",
      lName:"",
      houseNum:"",
      street:"",
      city:""});
      
      navigate("/");
    }

       
    
   
const actionButton = (voter) => {
  setSearchState({fName:"",
  lName:"",
  city:"",
  houseNum:voter.sHouseNum,
  street:voter.szStreetName});
  
navigate("/");
  
}



const ListTag = () => voters.map(voter => (<div className="fullRow"><div className="leftRow text-start">
  <span className="navy">{voter.szNameLast} , {voter.szNameFirst}</span>
<br/><span className="row2 text-start">{voter.sHouseNum} {voter.szStreetName}, {voter.szSitusCity} 
</span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack" onClick={() => actionButton(voter)}/></div>
</div>
))


if(loading) {
return(
  <h1 className="midPageMargin">Loading Voters......</h1>
)

}



else {

  if(voters.length === 0) {

    return (
      <Fragment >

        <div className="text-center">
          <div className="fixed-top mt-4 newSearch" onClick={newSearch}>Click Here for NEW SEARCH</div>
        </div>

        <div className="midPageMargin"></div>  
  
        <h1>No Results.  Please Search Again.</h1>
  
      </Fragment>
)

  }

  else {

    return (
          <Fragment >

            <div className="text-center">
              <div className="fixed-top mt-4 newSearch" onClick={newSearch}>Click Here for NEW SEARCH</div>
            </div>

            <div className="topMargin"></div>  
      
            <ListTag />
      
          </Fragment>
    )
  }
}


}

export default VoterList