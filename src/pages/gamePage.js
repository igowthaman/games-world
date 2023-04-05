import React from 'react';
import {Box, Button, CircularProgress, Divider, Grid, Typography, capitalize, styled, Modal, IconButton } from '@mui/material';
import connect from './connector';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';


const titleStyle = {fontWeight:"bold",opacity:0.7};

const GameDetailsGrid = styled(Grid)(({ theme }) => ({
    textAlign:"start",
    [theme.breakpoints.up('lg')]: {
        maxHeight:'85vh',
        overflow:"auto"
    }
}));

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 350,
    maxWidth: 600,
    bgcolor: "#3d4144",
    color: "white",
    border: '0px solid #000',
    boxShadow: 24,
    p:3,
    borderRadius: 3
};


class GamePage extends React.Component {
    constructor(){
        super();
        this.reviewInput = React.createRef(); 
        this.state = { 
            game : null,
            modal : false,
            rating : 0,
            review : 0,
            description : false
        } 
    }

   

    async componentDidMount(){
        const gameID = window.location.toString().split("/")[3];

        let gameResp = await connect("GET","https://free-to-play-games-database.p.rapidapi.com/api/game",{"id":gameID});
        if(gameResp.status !== 200)
        {
            gameResp = {data:undefined}
        }
        this.setState({
            ...this.state,
            game : gameResp.data
        })
    }

    handleModal(){
        this.setState(
            {
                ...this.state,
                modal : !this.state.modal
            }
        )
    }

    setRating(newValue){
        this.setState(
            {
                ...this.state,
                rating : newValue
            }
        )
    }

    submitReview(event, form){
        event.preventDefault();

        if(this.state.rating === 0){
            this.setState({
                ...this.state,
                review : 1
            })
            return;
        }
        console.log(
            "rating : ",this.state.rating,"\n reviw : ",this.reviewInput.current.value
        )
        this.setState({
            ...this.state,
            review : 2
        })
        setTimeout(()=>{
            window.open(this.state.game.game_url,"_blank");
            this.setState({
                ...this.state,
                modal : !this.state.modal,
                rating : 0,
                review : 0
            })
        }, 1500)
        
        return;
    }

    setDescription(){
        this.setState(
            {
                ...this.state,
                description : !this.state.description
            }
        )
    }

    render() { 
        return (
            <div style={{paddingTop:3}}>
             {
                this.state.game !== null
                ?(
                    this.state.game !== undefined
                    ?(
                    <>
                        <Grid container sx={{color:"white", mt:3, px:4}} justifyContent="space-evenly" spacing={5}>
                            <Grid item xs={12}  lg={4} pb={4}>
                                <img src={this.state.game.thumbnail} alt={this.state.game.title} style={{maxWidth:"100%"}}></img>
                                <Typography component={"div"} variant='h4' pt={4} pb={4}>
                                    {this.state.game.title}
                                </Typography>
                                <Button variant='contained' onClick={()=>this.handleModal()}> 
                                    Play Now
                                </Button>
                            </Grid>
                            <GameDetailsGrid item xs={12} lg={8}>
                                
                                <Box mb={3}>
                                    <Typography component={"div"} variant='h5' sx={titleStyle}>About</Typography>
                                    <Divider color="white" sx={{my:1}}/>
                                    <Typography component={"div"} variant='subtitle1'>
                                        {   this.state.description
                                            ?this.state.game.description
                                            :this.state.game.description.slice(0,400)
                                        }
                                        <Button onClick={()=>this.setDescription()}>
                                            {   this.state.description
                                            ?"Show Less"
                                            :"Show More"
                                        }</Button>
                                    </Typography>
                                </Box>
                                <Box mb={3}>
                                    <Typography component={"div"} variant='h5' sx={titleStyle}>Additional </Typography>
                                    <Divider color="white" sx={{my:1}}/>
                                    <Grid container>    
                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                            <Typography component={"div"} variant='title1' sx={titleStyle}>Developer </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={9} lg={9} pb={2}>
                                            <Typography component={"div"} variant='title1'>{this.state.game.developer} </Typography>
                                        </Grid>
                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                            <Typography component={"div"} variant='title1' sx={titleStyle}>Publisher </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={9} lg={9} pb={2}>
                                            <Typography component={"div"} variant='title1'>{this.state.game.publisher} </Typography>
                                        </Grid>
                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                            <Typography component={"div"} variant='title1' sx={titleStyle}>Release Date </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={9} lg={9} pb={2}>
                                            <Typography component={"div"} variant='title1'>{this.state.game.release_date} </Typography>
                                        </Grid>
                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                            <Typography component={"div"} variant='title1' sx={titleStyle}>Genre </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={9} lg={9} pb={2}>
                                            <Typography component={"div"} variant='title1'>{this.state.game.genre} </Typography>
                                        </Grid>
                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                            <Typography component={"div"} variant='title1' sx={titleStyle}>Platform </Typography>
                                        </Grid>
                                        <Grid item xs={7} md={9} lg={9} pb={2}>
                                            <Typography component={"div"} variant='title1'>{this.state.game.platform} </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                                <Box mb={3}>
                                    <Typography component={"div"} variant='h5' sx={titleStyle}>Screenshots</Typography>
                                    <Divider color="white" sx={{my:1}}/>
                                    <Grid container spacing={2}>    
                                    {
                                        this.state.game.screenshots.map(
                                            (item, ind)=>{
                                                return <Grid item xs={10} md={4} key={ind} >
                                                    <img src={item.image} alt={this.state.game.title} width="100%"></img>
                                                </Grid>
                                            }
                                        )
                                    }
                                    </Grid>
                                </Box>
                                <Box mb={3}>
                                    <Typography component={"div"} variant='h5' sx={titleStyle}>System Requirements</Typography>
                                    <Divider color="white" sx={{my:1}}/>
                                    <Grid container> 
                                        {
                                            this.state.game.platform !== "Web Browser"
                                            ?Object.keys(this.state.game.minimum_system_requirements).map(
                                                (item,ind)=>{
                                                    return <>
                                                        <Grid item xs={5} md={3} lg={3} pb={2} key={item}>
                                                            <Typography component={"div"} variant='title1' sx={titleStyle}>{capitalize(item)} </Typography>
                                                        </Grid>
                                                        <Grid item xs={7} md={9} lg={9} pb={2} key={ind}>
                                                            <Typography component={"div"} variant='title1'>{this.state.game.minimum_system_requirements[item]} </Typography>
                                                        </Grid>
                                                    </>
                                                }
                                            )
                                            :<Typography component={"div"} variant='title1' > 
                                                {this.state.game.title} is a browser based game and should run smoothly on practically any PC with a updated web-browser.
                                            </Typography>
                                        }   
                                    
                                    </Grid>
                                </Box>
                            </GameDetailsGrid>
                        </Grid>
                        <Modal
                            open={this.state.modal}
                            onClose={()=>this.handleModal()}
                            aria-labelledby="form-modal-title"
                            aria-describedby="form-modal-description"
                        >
                            <form onSubmit={(event)=>this.submitReview(event)}>
                                <Box sx={{...modalStyle,textAlign:"center"}}>
                                    <Box sx={{display:"flex", justifyContent:"space-between", borderBottom:"1px solid white"}}>
                                        <Typography variant='h6' container='div' id="form-modal-title">Rate your experience</Typography>
                                        <IconButton size='small' p={2} sx={{color:"white"}} onClick={()=>{this.handleModal()}}><CloseIcon/></IconButton>
                                    </Box>
                                    <Box sx={{pt:2}}>
                                        <Typography component="legend" sx={{...titleStyle,textAlign:"start"}} pb={1}>Overall ratings</Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={this.state.rating}
                                            onChange={(event, newValue) => {
                                                this.setRating(newValue);
                                            }}
                                            sx={{margin:"auto",border:""}}
                                            size="large"   
                                             
                                        />
                                    </Box>
                                    
                                    <Box sx={{py:2}}>
                                        <Typography component="legend" sx={{...titleStyle,textAlign:"start"}} pb={1}>Review</Typography>
                                        <textarea rows={6} style={{width:"100%", color:"white", background:"#3a3f44",padding:"4px",fontSize:"15px"}} required ref={this.reviewInput}/>
                                    </Box>
                                    {this.state.review === 1 && <Typography component="legend" sx={{color:"red"}} pb={1}>Rating required</Typography>}
                                    {this.state.review === 2 && <>
                                        <Typography component="legend" sx={{color:"green", fontWeight:"bold"}} pb={1}>Thanks for reviewing us</Typography>
                                        
                                    </>}
                                    <Button type='submit' variant='contained'>Submit</Button>
                                    <hr/>
                                    <Typography variant='title1' component="legend" sx={titleStyle} pb={1}>Continue without review</Typography>
                                    <Link style={{textDecoration:"none"}} to={this.state.game.game_url} target='_blank'>
                                        <Button variant='contained' onClick={()=>this.handleModal()}>Play Now</Button>
                                    </Link>
                                </Box>
                            </form>
                        </Modal>
                    </> 
                    )
                    :<Box py={8} sx={{color:"white", fontSize:18}} style={titleStyle}>
                        Game not found
                    </Box>
                )
                :<CircularProgress sx={{my:7}} size={30}/>
            }
            </div>
        );
    }
}
 
export default GamePage;