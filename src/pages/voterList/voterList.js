import React, {Fragment, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/search/searchContext';
import {AppContext} from '../../context/app/appContext';
import AuthContext from '../../context/auth/authContext';
import * as FaIcons from 'react-icons/fa';
import GetLocation from '../../components/getLocation/GetLocation';
import { connect, Connect } from 'react-redux';
import { getVoters } from '../../actions/voterActions';





const VoterList = ({voter:{voters, loading}}) => {

    const authContext = useContext(AuthContext);
    
    useEffect(() => {
     authContext.loadUser();

    }, [])

    const {user} = authContext;

    const appContext = useContext(AppContext);
    
    const {appState, setAppState} = appContext;

    
  
    const searchContext = useContext(SearchContext);

    const {data, setSearchState} = searchContext;
    const {searchCounty} = data;

  

     


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

const mapVoters = () => {

navigate("/mapVoters");
  
};       
    
   
const actionButton = (currentVoter) => {


  if(searchCounty == "FRESNO") {

    setSearchState({...data,fName:"",
    lName:"",
    city:"",
    houseNum:currentVoter.sHouseNum,
    street:currentVoter.szStreetName});
    };

  if(searchCounty == "RIV") {

  setSearchState({...data,fName:"",
  lName:"",
  city:"",
  houseNum:currentVoter.sHouseNum,
  street:currentVoter.szStreetName});
  };

  if(searchCounty == "SB") {

    setSearchState({...data,fName:"",
    lName:"",
    city:"",
    houseNum:currentVoter.house_number,
    street:currentVoter.street});
    };




navigate("/");
  
}



let ListTag = "";

let loadingMesssage = "";

if(searchCounty == "RIV") {
loadingMesssage = "Loading Voters for RIV County"

ListTag = () => voters.map(currentVoter =>
    (<div className="fullRow"><div className="leftRow text-start">
    <span className="navy">
    {currentVoter.szNameLast} ,
    {currentVoter.szNameFirst}</span><br/><span className="row2 text-start">
    {currentVoter.sHouseNum}
    {currentVoter.szStreetName},
    {currentVoter.sUnitAbbr}
    {currentVoter.sUnitNum ? currentVoter.sUnitNum + "," : ""}
    {currentVoter.szSitusCity} 
    </span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack"
    onClick={() => actionButton(currentVoter)}/></div>
</div>
))
}

if(searchCounty == "FRESNO") {
  loadingMesssage = "Loading Voters for FRESNO County"
  
  ListTag = () => voters.map(currentVoter => (<div className="fullRow">
      <div className="leftRow text-start">
      <span className="navy">
      {currentVoter.szNameLast} ,
      {currentVoter.szNameFirst}</span> <br/><span className="row2 text-start">
      {currentVoter.sHouseNum}
      {currentVoter.szStreetName},
      {currentVoter.sUnitAbbr}
      {currentVoter.sUnitNum ? currentVoter.sUnitNum + "," : ""}
      {currentVoter.szSitusCity} 
      </span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack"
      onClick={() => actionButton(currentVoter)}/></div>
  </div>
  ))
  }

if(searchCounty == "SB") {
  loadingMesssage = "Loading Voters for SB County"

 ListTag = () => voters.map(currentVoter => (<div className="fullRow">
    <div className="leftRow text-start"> 
    <span className="navy">
    {currentVoter.name_last} ,
    {currentVoter.name_first}</span><br/><span className="row2 text-start">
    {currentVoter.house_number}
    {currentVoter.street},
    {currentVoter.apartment_number ? currentVoter.apartment_number + ", " : ""}
    {currentVoter.city}
    {user.seeParty ? <span className="party"> - 
    {currentVoter.party}</span> : ""}   
    </span></div><div className="rightRow"><FaIcons.FaHouseUser className="iconLgBlack"
    onClick={() => actionButton(currentVoter)}/></div>
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
          <div className="fixed-top mt-1 newSearch" onClick={newSearch}><FaIcons.FaSearch className="iconItem"/></div>
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
              <div className="fixed-top mt-1 newSearch" onClick={newSearch}><FaIcons.FaSearch className="iconItem"/></div>
            </div>
            
            

            <div className="topMargin"></div>  
            
            <ListTag />
      
          </Fragment>
    )
  }
}


}

const mapStateToProps = state =>  ({
  voter: state.voter
});

export default connect(mapStateToProps, {getVoters}) (VoterList);