import React ,{useState, createContext} from 'react';

export const AppContext = createContext();


const AppState = (props) => {

    const [appState, setAppState] = useState({loading:false, currentUser: "" });



  return (

    <AppContext.Provider value = {{appState, setAppState}}>
    {props.children}
    </AppContext.Provider>
  )
  
  
};

export default AppState;