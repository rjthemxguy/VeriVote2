import React, {useReducer, useContext} from 'react';
import VoterContext from './voterContext';
import voterReducer from './voterReducer';
import AppState, { AppContext } from '../../context/app/appContext';
import SearchContext from '../search/searchContext';

import { GET_VOTERS, VOTER_ERROR } from '../../types';
import axios from 'axios';

const VoterState = props =>{


        

    const initialState = {

        voters : [{}]
        
    };

    const [state,dispatch] = useReducer(voterReducer, initialState);

    const appState = useContext(AppContext);

    const {appData, setAppState} = appState;

    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const getVoters = async (props) => {

        
        const data = props;

        if(data.searchCounty == "SB") {
           
        }


        let lName = data.lName.toUpperCase();
        let fName = data.fName.toUpperCase();
        let street = data.street.toUpperCase();
        let city = data.city.toUpperCase();

        
        
        let queryArray = {
            1:`http://137.184.185.127:5000/api/voters?last=${(lName)}&first=${(fName)}&house=${data.houseNum}&street=${(street)}&city=${(city)}`,
            2:`http://139.59.170.27:5000/api/voters?last=${Capitalize(data.lName)}&first=${Capitalize(data.fName)}&house=${data.houseNum}&street=${Capitalize(data.street)}&city=${Capitalize(data.city)}`,
            3:`http://137.184.236.130:5000/api/voters?last=${Capitalize(data.lName)}&first=${Capitalize(data.fName)}&house=${data.houseNum}&street=${Capitalize(data.street)}&city=${Capitalize(data.city)}`
        }

        let indexCounty = 1;

        if(data.searchCounty == "RIV") {
            indexCounty = 2;
        }

        if(data.searchCounty == "SB") {
            indexCounty = 1;
        }

        if(data.searchCounty == "FRESNO") {
            indexCounty = 3;
        }


         
        
        const query = queryArray[indexCounty];
       
       
        try {
            setAppState({loading:true});


           const voters = await axios.get(query);

           setAppState({loading:false});

           
                dispatch({
                    type: GET_VOTERS,
                    payload: voters.data
                });

        } catch (err) {
           
            dispatch({
                type:VOTER_ERROR,
                payload: err.response.msg
            });
        }
    };

    return (
        <VoterContext.Provider value = {{
            voters:state.voters,
            getVoters
        }}>
            {props.children}

        </VoterContext.Provider>
    )
};

export default VoterState;