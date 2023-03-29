import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar';

class AppPage extends React.Component {
    state = {  } 
    render() { 
        return (
        <>
            <NavBar/>
            <Outlet/>
        </>
        );
    }
}
 
export default AppPage;