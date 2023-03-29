import React from 'react';
import './App.css';
import SiginPage from './pages/signinPage';
import AppRouter from './pages/appRoute';


class App extends React.Component {
  state={
    IsLogin : true,
    UserDeatils : {
      "name" : "Gowthaman",
      "email" : "gowthaman@gmail.com"
    }
  }
  render() { 
    return (
      <div className="App">
        {
          this.state.IsLogin
          ?<AppRouter UserDeatils={this.state.UserDeatils}/>
          :<SiginPage/>
        }
      </div>
    );
  }
}
 
export default App;
