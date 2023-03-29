import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

class GameCard extends React.Component {
    state = {  } 
    render() { 
        return (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia sx={{ height: 200 }} image={this.props.game.thumbnail}/>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {this.props.game.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {this.props.game.short_description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
 
export default GameCard;