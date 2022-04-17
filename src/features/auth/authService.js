import axios from "axios";
import setAuthToken from '../../setAuthToken';

let API_URL= "http://139.59.170.27:5000/api/";

const register = async (userData) => {

    

    const response = await axios.post(API_URL + "users", userData)

    if(response.data) {
        localStorage.setItem('token', response.data.token)
    }

    return response.data;

 }


 const loadUser = async () => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }


     const response = await axios.get(API_URL + "auth");

     if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data;

};

const setCounty = async (county) => {

     
    localStorage.setItem('county', county)
    

    return county;

 }

 const login = async (userData) => {

    const response = await axios.post(API_URL + "auth", userData)

    if(response.data.token) {
        localStorage.setItem('token', response.data.token)
    }

    return response.data;

 }

const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('county');
}
 




 const authService = {
     register,
     login,
     logout,
     loadUser,
     setCounty
 }

 export default authService;
