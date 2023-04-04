import { Card, CardContent, CardMedia, Typography} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


class GameCard extends React.Component {
    state = { description :true } 

    setDescription(){
        this.setState({
            description : !this.state.description
        })
    }
    
    render() {
        return (
            <Link to={"/"+this.props.game.id} style={{textDecoration:"none"}}>
                <Card sx={{ maxWidth: 300, margin: "auto", height:400, border:"1px solid #3a3f44", borderRadius:"10px", "&:hover":{opacity:0.7}}}>
                    <CardMedia sx={{ height: 200 }} image={this.props.game.thumbnail}/>
                    <CardContent sx={{bgcolor:"#3a3f44",height:"50%",color:"white"}}>
                        <Typography gutterBottom variant="h6" component="div">
                            {this.props.game.title}
                        </Typography>
                        <Typography variant="body2" color="white" sx={{opacity:0.5}}>
                            {this.props.game.short_description}
                        </Typography>
                        {/* <Box p={1}>
                            <Chip label={this.props.game.genre} sx={{bgcolor:"#282c348c", color:"white", fontWeight:"bold"}} />
                        </Box> */}
                    </CardContent>
                </Card>
            </Link>
            
        );
    }
}
 
export default GameCard;