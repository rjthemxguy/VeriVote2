import axios from "axios";



 const getVoters = async (searchData) => {

   const {lName, fName, houseNum, street, city} = searchData;

   
     const response = await axios.get(
        `http://137.184.185.127:5000/api/voters?last=${(lName)}&first=${(fName)}&house=${houseNum}&street=${(street)}&city=${(city)}`);

                    return response.data;

      }

   



 const voterService = {
    getVoters
 }

 export default voterService;
