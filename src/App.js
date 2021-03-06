import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/navbar/Navbar';
import AuthState from '../src/context/auth/AuthState';
import AppState from './context/app/appContext';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Search from './pages/search/search';
import SearchState from './context/search/searchContext';
import setAuthToken from './setAuthToken';
import Register from './pages/register/register';
import Login from './pages/login/login';
import PrivateRoute from './components/privateRoute';
import VoterState from './context/voter/VoterState';
import NotActive from './pages/notActive/notActive';
import VoterList from './pages/voterList/voterList';
import UserState from './context/user/UserState';
import UserDetail from './pages/userDetail/UserDetail';
import ListUsers from './pages/listUsers/ListUsers';
import CountyList from './pages/listCounties/ListCounties';
import MapVoters from './pages/mapVoters/MapVoters';

if(localStorage.token) {
  setAuthToken(localStorage.token);
  
}


function App() {
  return (
    <div className="App">
      <div>
      <AuthState>
        <AppState>
          <UserState>
         <SearchState>   
          <VoterState>
          
            <BrowserRouter>
              <Navbar/>
                <Routes>

                      <Route path='/' element={<PrivateRoute/>}>  
                        <Route path="/" element={<Search />}/>
                      </Route>

                  <Route path="/register" element={<Register />}/>
                  <Route path="/login" element={<Login />}/>

                      <Route path='/' element={<PrivateRoute/>}> 
                          <Route path="/results" element={<VoterList />}/>
                      </Route>

                      <Route path='/' element={<PrivateRoute/>}>
                  <Route path="/notActive" element={<NotActive />}/>
                        </Route>

                        <Route path='/' element={<PrivateRoute/>}>
                  <Route path="/mapVoters" element={<MapVoters />}/>
                        </Route>

                      <Route path='/' element={<PrivateRoute/>}>
                         <Route path="/userDetail" element={<UserDetail />}/>
                      </Route>
                      <Route path='/' element={<PrivateRoute/>}>
                          <Route path="/listUsers" element={<ListUsers />}/>
                      </Route>

                      <Route path='/' element={<PrivateRoute/>}>
                          <Route path="/countyList" element={<CountyList />}/>
                      </Route>
                </Routes>
            </BrowserRouter>
         
           </VoterState>
           </SearchState>
           </UserState>
          </AppState>
      </AuthState>
      </div>   
    </div>
  );
}

export default App;
