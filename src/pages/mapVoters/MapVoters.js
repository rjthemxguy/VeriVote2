import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import GetLocation from '../../components/getLocation/GetLocation'
import VoterContext from '../../context/voter/voterContext'
import axios from 'axios';

const MapVoters = async () => {

    
  


   const voterLocation = await axios.get("http://api.positionstack.com/v1/forward?access_key=663530caf49078f93d51ebf3295229f0&query=25577 Cottonwood rd, loma linda, ca",{
     crossdomain: true 
   })
       
    
 return (

  <div>TEST</div>
 )
   



  
}



export default MapVoters