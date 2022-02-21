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
    const {searchCounty} = data;

    const  voterContext = useContext(VoterContext);

    const { voters, getVoters } = voterContext;     


    const navigate = useNavigate();

    useEffect(() => {
        getVoters(data);
       
            //eslint-disable-next-line
    }, []);

    function newSearch(){
      setSearchState({...data,
      fName:"",
      lName:"",
      houseNum:"",
      street:"",
      city:""});
      
      navigate("/");
    }

       
    
   
const actionButton = (voter) => {


  if(searchCounty == "RIV") {

  setSearchState({...data,fName:"",
  lName:"",
  city:"",
  houseNum:voter.sHouseNum,
  street:voter.szStreetName});
  };

  if(searchCounty == "SB") {

    setSearchState({...data,fName:"",
    lName:"",
    city:"",
    houseNum:voter.house_number,
    street:voter.street});
    };




navigate("/");
  
}

let ListTag = "";





let loadingMesssage = "";

if(searchCounty == "RIV") {
loadingMesssage = "Loading Voters for RIV County"

ListTag = () => voters.map(voter => (<div className="fullRow"><div className="leftRow text-start">
  <span className="navy">{voter.szNameLast} , {voter.szNameFirst}</span>
<br/><span className="row2 text-start">{voter.sHouseNum} {voter.szStreetName} {voter.sUnitAbbr} {voter.sUnitNum},  {voter.szSitusCity} 
</span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack" onClick={() => actionButton(voter)}/></div>
</div>
))
}

if(searchCounty == "SB") {
  loadingMesssage = "Loading Voters for SB County"

 ListTag = () => voters.map(voter => (<div className="fullRow"><div className="leftRow text-start">
  <span className="navy">{voter.name_last} , {voter.name_first}</span>
<br/><span className="row2 text-start">{voter.house_number} {voter.street}, {voter.city} 
</span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack" onClick={() => actionButton(voter)}/></div>
</div>
))
  }

if(loading) {
return(
  <h1 className="midPageMargin">{loadingMesssage}</h1>
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