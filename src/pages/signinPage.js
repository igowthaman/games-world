import { Box, Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

class SigninPage extends React.Component {
    async componentDidMount(){
        if(window.location.hash){
            let userObj = {};
            for(let value of window.location.hash.split("&")){
                userObj[value.split("=")[0]] = value.split("=")[1];
            }
            console.log(userObj);
            this.props.setUser(userObj);
        }
    }

    render() { 
        if(window.location.hash){

            return <Box py={10} >
                {this.props.user && <Navigate to="/"/>}
                <CircularProgress size={30} />
                <Typography variant='h6' component="div" sx={{color:"white"}}>Just a second</Typography>
            </Box>
        }
        return (<>
        {this.props.user && <Navigate to="/"/>}
        <Box sx={{py:7}}>
            <Card sx={{maxWidth:500,mx:"auto",bgcolor:"#3a3f44",color:"white",border:"0px solid black", borderRadius:5,p:4}}>
                <CardContent>
                    <Typography  variant='title1' component="div" sx={{py:2}}>
                        Welcome to,
                    </Typography>
                    <Typography  variant='h5' component="div" sx={{fontWeight:"bold",pb:2}}>Games World</Typography>
                    <hr/>
                    <Typography  variant='title1' component="div" sx={{pt:2 , pb:5}}>
                        Continue with your Google Account  to enter the world of games
                    </Typography>
                    <Link to="https://accounts.google.com/o/oauth2/v2/auth?client_id={client_id}&redirect_uri=http://localhost:3000/signin&response_type=token&scope=https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true" style={{textDecoration:"none"}}>
                        <Button variant='contained' startIcon={<GoogleIcon/>}>
                            Sign in with Google
                        </Button>
                    </Link>
                </CardContent>
            </Card>
        </Box>
            
        </>);
    }
}
 
export default SigninPage;