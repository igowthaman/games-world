import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/signinPage';
import AppPage from './pages/appPage';
import HomePage from './pages/homePage';
import GamePage from './pages/gamePage';
import ExplorePage from './pages/explorePage';


class App extends React.Component {
  constructor(){
    super();
    this.state={
      UserDeatils : null
    }
    this.setUser = this.setUser.bind(this);
  }

  setUser(userObj){
    this.setState({
      UserDeatils : userObj
    })
  }

  render() { 
    return (
      <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AppPage user={this.state.UserDeatils} setUser={this.setUser}/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="/explore" element={<ExplorePage/>}/>
                    <Route path="/:gameid" element={<GamePage/>}/>
                </Route>
                <Route path="/signin" element={<SigninPage user={this.state.UserDeatils} setUser={this.setUser}/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
 
export default App;
