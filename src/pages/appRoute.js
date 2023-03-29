import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppPage from './appPage';
import HomePage from './homePage';

class AppRouter extends React.Component {
    render() { 
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<AppPage/>}>
                        <Route index element={<HomePage/>}/>
                        <Route index element={<HomePage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default AppRouter;