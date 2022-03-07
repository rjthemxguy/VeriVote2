import React, {useContext} from 'react';
import axios from 'axios';
import VoterContext from '../../context/voter/voterContext';




const GetLocation = () => {

    const  voterContext = useContext(VoterContext);
    const {voters} = voterContext;


   const results = voters.map(voter => voter.house_number +
     " " + voter.street +
      " " + voter.city +
       ", " + "CA" );
  
        return results;
}

export default GetLocation