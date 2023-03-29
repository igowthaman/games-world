import React from 'react';
import { AppBar, Container, Toolbar, Typography, MenuItem, Menu, Avatar, IconButton, Tooltip, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    state = {
        menuStatus : false
    }

    render() { 
        return (
            <AppBar position="static" sx={{backgroundColor:"#282c34"}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 800,
                                letterSpacing: '.1rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                textAlign: 'start'
                            }}
                        >
                            Games World
                        </Typography>
                      
                        <Box>
                            <Tooltip title="Search">
                                <Link to="/">
                                    <IconButton onClick={()=>{}} sx={{ p : 1, mx : 2 }}>
                                        <SearchIcon fontSize='large' sx={{color:"white"}}/>
                                    </IconButton>
                                </Link>
                            </Tooltip>

                            <Tooltip title="Profile">
                                <IconButton onClick={()=>{this.setState({menuStatus : !this.state.menuStatus})}} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/ogw/AAEL6sjIQ_9YQigvlBGnALLXg4tHT3dNVjJTwlpjEUvD=s32-c-mo"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.menuStatus}
                                onClose={()=>{this.setState({menuStatus : !this.state.menuStatus})}}
                            >
                                <MenuItem onClick={()=>{this.setState({menuStatus : !this.state.menuStatus})}}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        );
    }
}
 
export default NavBar;