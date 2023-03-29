import axios from 'axios';

const connect = async (method, url, params = {})=>{
    const options = {
        method: method,
        url: url,
        params: params,
        headers: {
          'X-RapidAPI-Key': '5587c7213dmshc9b916d1d2db35ap1f9ef1jsn603287695fb8',
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

export default connect;
