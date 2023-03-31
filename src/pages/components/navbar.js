import React from 'react';
import { AppBar, Container, Toolbar, Typography, MenuItem, Menu, Avatar, IconButton, Tooltip, Box } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';


class NavBar extends React.Component {
    state = {
        menuStatus : false
    }

    render() { 
        return (
            <AppBar position="fixed" sx={{backgroundColor:"#282c34"}}>
                { 
                    this.props.user === null 
                    ?<Navigate to="/signin" />
                    :""
                }
                <Container maxWidth="xl">
                    <Toolbar sx={{display:"flex",justifyContent:"space-between"}}>
                        <Box>
                            <Link to="/" style={{textDecoration:"none"}}>
                                <Typography
                                    variant="h5"
                                    noWrap
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        flexGrow: 1,
                                        fontFamily: 'monospace',
                                        fontWeight: 800,
                                        letterSpacing: '.1rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                        textAlign: 'start'
                                    }}
                                >
                                    Games World
                                </Typography>
                            </Link>
                        </Box>
                            
                        <Box>
                            <Tooltip title="Profile">
                                <IconButton onClick={()=>{this.setState({menuStatus : !this.state.menuStatus})}} sx={{ p: 0 }}>
                                    <Avatar><PersonIcon/></Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="menu-appbar"
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                anchorEl={this.state.menuStatus}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={this.state.menuStatus}
                                onClose={()=>{this.setState({menuStatus : !this.state.menuStatus})}}
                            >
                                
                                <MenuItem onClick={()=>{this.setState({menuStatus : !this.state.menuStatus})}}>
                                    <Typography textAlign="center" onClick={()=>{this.props.setUser(null)}}>Logout</Typography>
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