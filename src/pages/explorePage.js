import React from 'react';
import {FormControl, InputLabel, Select, MenuItem, Grid, Box, OutlinedInput, Checkbox, ListItemText, CircularProgress, Typography, Pagination} from '@mui/material'
import RapidAPIConnect from './connector';
import GameCard from './components/gameCard';

const categories = ["mmorpg","shooter","strategy","moba","racing","sports","social","sandbox","open-world","survival","pvp","pve","pixel","voxel","zombie","turn-based","first-person","third-Person","top-down","tank","space","sailing","side-scroller","superhero","permadeath","card","battle-royale","mmo","mmofps","mmotps","3d","2d","anime","fantasy","sci-fi","fighting","action-rpg","action","military","martial-arts","flight","low-spec","tower-defense","horror","mmorts"];

class ExplorePage extends React.Component {
    state = {
        sort : "relevance",
        category : [],
        games : [],
        status : false,
        pages : 0
    }

    alterSort(value){
        this.setState({
            ...this.state,
            sort:value,
            status : false
        })
    }

    alterCategory(value){
        this.setState({
            ...this.state,
            category: value,
            status : false
        })
    }

    async getGames(){
        let apiURL = `https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=${this.state.sort}`;
        if(this.state.category.length !== 0){
            apiURL += `&category=${this.state.category.join(".")}`;
        }
        const gamesResp = await RapidAPIConnect("GET",apiURL);
        if(gamesResp.status === 200)
        {
            this.setState({
                ...this.state,
                games : gamesResp.data,
                status : true,
                pages : Math.ceil(gamesResp.data.length / 20),
                pages_games : gamesResp.data.slice(0,20)
            })
        }
        else{
            this.setState({
                ...this.state,
                games : [],
                status : true
            })
        }
    }

    componentDidMount(){
        this.getGames();
    }

    componentDidUpdate(){
        if(!this.state.status)
        {
            this.getGames();
        }
    }

    updatePage(newpage){
        let start = (newpage-1)*20;
        let end = (newpage* 20);
        if(end > this.state.games.length){
            this.setState({
                ...this.state,
                pages_games : this.state.games.slice(start, this.state.games.length)
            })
        }
        else{
            this.setState({
                ...this.state,
                pages_games : this.state.games.slice(start, end)
            })
        }
    }

    render() { 
        return (
        <Grid container sx={{color:"white", px:2}}>
            <Grid item xs={12} md={10} lg={9} m="auto" pt={2}>
                <Box sx={{bgcolor:"#3a3f44",p:2, textAlign:"start", borderRadius:"10px"}}>
                    <FormControl sx={{ m: 1, width:"100%", maxWidth:"200px", outlineColor:"white"}} size="small">
                        <InputLabel id="sort" sx={{color:"white",  borderColor:"white"}} >Sort by</InputLabel>
                        <Select
                            labelId="sort"
                            id="sort"
                            value={this.state.sort}
                            label="Sort by"
                            onChange={(event)=>this.alterSort(event.target.value)}
                            sx={{color:"white", borderColor:"white",py:1,"fieldset":{borderColor:"white"}}}
                        >#3a3f44
                            <MenuItem value={"relevance"}>Relevance</MenuItem>
                            <MenuItem value={"release-date"}> Release Date</MenuItem>
                            <MenuItem value={"popularity"}>Popularity</MenuItem>
                            <MenuItem value={"alphabetical"}>Alphabetical</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width:"100%", maxWidth:"200px","fieldset":{borderColor:"white"}}}>
                        <InputLabel id="category" sx={{color:"white"}}>Category</InputLabel>
                        <Select
                            labelId="category"
                            id="category"
                            multiple
                            value={this.state.category}
                            onChange={(event)=>{this.alterCategory(event.target.value)}}
                            input={<OutlinedInput label="Category" />}
                            renderValue={(selected) => selected.join(', ')}
                            sx={{color:"white"}}
                        >
                        {categories.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={this.state.category.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                    
                </Box>
                <Box sx={{textAlign:"center"}} pt={2} pb={4}>
                    {
                        this.state.status
                        ?(
                            this.state.games.length !== 0
                            ?<>
                                <Grid container spacing={{xs:2,lg:3}} sx={{py:2}} justifyContent="space-evenly">
                                    {
                                        this.state.pages_games.length !== 0
                                        ?this.state.pages_games.map((game, ind)=>{
                                            return <Grid item key={ind} xs={12} md={4} lg={3}>
                                                <GameCard game={game}/>
                                            </Grid>
                                        })
                                        :<Typography >No Games Found</Typography>
                                    }
                                </Grid>
                                <Box width="50%" m="auto">
                                    <Pagination count={this.state.pages} size='large' color='primary' sx={{color:"white", width:"auto","button, div":{color:"white"}}} onChange={(event, page)=>{this.updatePage(page)}} />
                                </Box>
                            </>
                            :<Typography >No Games Found</Typography>
                        )
                        :<CircularProgress sx={{my:7}} size={30}/>
                    }
                </Box>
            </Grid>               
            
        </Grid>);
    }
}
 
export default ExplorePage;