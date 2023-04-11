import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SigninPage from './pages/signinPage';
import AppPage from './pages/appPage';
import HomePage from './pages/homePage';
import GamePage from './pages/gamePage';
import ExplorePage from './pages/explorePage';
import ErrorBoundary from './pages/errorPage';

const SCOPE = 'https://www.googleapis.com/auth/userinfo.profile'
let _gapi = null;
let _googleAuth = null;



class App extends React.Component {
  constructor(){
    super();
    this.state={
      UserDeatils : null,
      userToken : null,
      status : false
    }
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.setSigninStatus = this.setSigninStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
  }

  componentDidMount(){
    _gapi = window.gapi;

    _gapi.load('client:auth2', () => {
      (async () => { 
        await _gapi.client.init({
          apiKey :process.env.REACT_APP_GAPI_KEY ,
          client_id: process.env.REACT_APP_GAPI_CLIENT_ID,
          plugin_name:'games-world',
          scope: SCOPE
        });

        _googleAuth = _gapi.auth2.getAuthInstance();
        _googleAuth.isSignedIn.listen(this.updateSigninStatus);
        var user = _googleAuth.currentUser.get();
        if(user.zc){
          this.setState({
            ...this.state,
            UserDeatils: user.tv,
            userToken :  user.zc,
            status: true
          })
        }
        else{
          this.setState({
            ...this.state,
            status: true
          })
        }
      })();
    });
  }

  handleAuthClick() {
    if (_googleAuth.isSignedIn.get()) {
      _googleAuth.signOut();
    } else {
      _googleAuth.signIn();
    }
  }

  
  setSigninStatus() {
    var user = _googleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
      this.setState({
        ...this.state,
        UserDeatils : user.tv,
        userToken :  user.zc
      })
    } 
    else {
      this.setState({
        ...this.state,
        UserDeatils : null,
        userToken : null,
      })
    }
  }

  updateSigninStatus() {
    this.setSigninStatus();
  }


  render() { 
    return (
      <div className="App">
        <ErrorBoundary>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<AppPage user={this.state.UserDeatils} setUser={()=>this.handleAuthClick()}/>}>
                      <Route index element={<HomePage/>}/>
                      <Route path="/explore" element={<ExplorePage/>}/>
                      <Route path="/:gameid" element={<GamePage/>}/>
                  </Route>
                  <Route 
                    path="/signin" 
                    element={
                      <SigninPage 
                        status={this.state.status} 
                        user={this.state.UserDeatils} 
                        setUser={()=>this.handleAuthClick()}
                      />
                    }
                  />
              </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </div>
    );

  }
}
 
export default App;
