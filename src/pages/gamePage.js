import React from 'react';
import {Box, Button, CircularProgress, Divider, Grid, Typography, capitalize, styled, Modal } from '@mui/material';
import connect from './connector';

const titleStyle = {fontWeight:"bold",opacity:0.7};

const GameDetailsGrid = styled(Grid)(({ theme }) => ({
    textAlign:"start",
    [theme.breakpoints.up('md')]: {
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
    maxWidth: 500,
    bgcolor: '#ffff',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    borderRadius: 3
};


class GamePage extends React.Component {
    state = { 
        game : null,
        modal : false
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

    render() { 
        return (
            <div>
             {
                this.state.game !== null
                ?(
                    this.state.game !== undefined
                    ?(
                        <Grid container sx={{color:"white", mt:3, px:4}} justifyContent="space-evenly">
                            <Grid item xs={12} md={5} lg={4} pb={4}>
                                <img src={this.state.game.thumbnail} alt={this.state.game.title} style={{maxWidth:"100%"}}></img>
                                <Typography component={"div"} variant='h4' pt={4} pb={4}>
                                    {this.state.game.title}
                                </Typography>
                                <Button variant='contained' onClick={()=>this.handleModal()}> 
                                    Play Now
                                </Button>
                            </Grid>
                            <GameDetailsGrid item xs={12} md={7} lg={8}>
                                
                                <Box mb={3}>
                                    <Typography component={"div"} variant='h5' sx={titleStyle}>About</Typography>
                                    <Divider color="white" sx={{my:1}}/>
                                    <Typography component={"div"} variant='subtitle1'>{this.state.game.description}</Typography>
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
                                    <Grid container>    
                                    {
                                        this.state.game.screenshots.map(
                                            (item, ind)=>{
                                                return <Grid item xs={10} md={3} key={ind} m="auto" >
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
                                                (item)=>{
                                                    return <>
                                                        <Grid item xs={5} md={3} lg={3} pb={2}>
                                                            <Typography component={"div"} variant='title1' sx={titleStyle}>{capitalize(item)} </Typography>
                                                        </Grid>
                                                        <Grid item xs={7} md={9} lg={9} pb={2}>
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
                    )
                    :<Box>
                        Game Not Found
                    </Box>
                )
                :<CircularProgress sx={{my:7}} size={30}/>
             }   
            <Modal
                open={this.state.modal}
                onClose={()=>this.handleModal()}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={modalStyle}>
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <p id="parent-modal-description">
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </p>
                </Box>
            </Modal>
            </div>
        );
    }
}
 
export default GamePage;