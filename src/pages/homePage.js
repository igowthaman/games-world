import React from 'react';
import connect from './connector';
import {CircularProgress} from '@mui/material';
import GameCard from './components/gameCard';


class HomePage extends React.Component {
    state = {
        games : [],
        count : 30
    }
    async componentDidMount(){
        const gamesResp = await connect("GET","https://free-to-play-games-database.p.rapidapi.com/api/games");
        this.setState({
            games : gamesResp.data
        })
    }
    render() { 
        return (
            <div>
             {
                this.state.games.length
                ?(
                    this.state.games.map((game, ind)=>{
                       if(ind < this.state.count)
                        return <GameCard game={game} key={ind} />
                       
                    })
                )
                :<CircularProgress sx={{my:7}} size={30}/>

             }   
            </div>
        );
    }
}
 
export default HomePage;