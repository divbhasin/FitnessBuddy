import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import MyNavBar from './MyNavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedLogin: false,
      isLoggedIn: false,
      user: {},
    };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    // axios.get('/api/logged_in', { withCredentials: true })
    //   .then(({ data }) => {
    //     if (data.logged_in) {
    //       this.handleLogin(data)
    //     } else {
    //       this.handleLogout()
    //     }
    //   })
    //   .catch(error => console.log('api errors:', error))
    return true
  }

  handleLogin = (data) => {
    this.setState({
      checkedLogin: true,
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
      checkedLogin: true,
      isLoggedIn: false,
      user: {}
    })
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
          <MyNavBar checkedLogin={this.state.checkedLogin} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} user={this.state.user} />
          <Switch>
            <Route exact path='/' render={props => <Home {...props} checkedLogin={this.state.checkedLogin} isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleClick} user={this.state.user} />} />
            <Route path='/signup' render={props => <Signup {...props} checkedLogin={this.state.checkedLogin} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>} />
            <Route exact path='/login' render={props => <Login {...props} checkedLogin={this.state.checkedLogin} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>} />
          </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
