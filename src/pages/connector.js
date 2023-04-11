import axios from 'axios';

const RapidAPIconnect = async (method, url, params = {})=>{
    const options = {
        method: method,
        url: url,
        params: params,
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };

    try{
        return await axios.request(options);
    }
    catch(error){
        return error;
    }
}

const GoogleAPIconnect = async (method, url)=>{

    const options = {
        method: method,
        url: url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        }
    };

    try{
        return await axios.request(options);
    }
    catch(error){
        return error;
    }
}

export  default RapidAPIconnect ;
export { GoogleAPIconnect};
