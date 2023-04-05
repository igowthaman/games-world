import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

class SigninPage extends React.Component {

    render() { 
        let path = null;
        if(window.location.search){
            let params = new URL(document.location).searchParams;
            path = params.get("redirect");
        }

        return (<>
        {(this.props.user)&& <Navigate to={path?path:"/"}/>}
        <Box sx={{py:7}}>
            {
                this.props.status
                ?<Card sx={{maxWidth:500,mx:"auto",bgcolor:"#3a3f44",color:"white",border:"0px solid black", borderRadius:5,p:4}}>
                    <CardContent>
                        <Typography  variant='title1' component="div" sx={{py:2}}>
                            Welcome to,
                        </Typography>
                        <Typography  variant='h5' component="div" sx={{fontWeight:"bold",pb:2}}>Games World</Typography>
                        <hr/>
                        <Typography  variant='title1' component="div" sx={{pt:2 , pb:5}}>
                            Continue with your Google Account  to enter the world of games
                        </Typography>
                        <Button variant='contained' startIcon={<GoogleIcon/>} onClick={this.props.setUser}>
                            Sign in with Google
                        </Button>
                        <div id="google-signin"></div>
                    </CardContent>
                </Card>
                :<CircularProgress />
            }   
        </Box>
            
        </>);
    }
}
 
export default SigninPage;