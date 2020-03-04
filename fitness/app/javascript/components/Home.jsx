import React, { Component } from 'react';
import Dashboard from './Dashboard'
import Landing from './Landing'

class Home extends Component {
  render() {
    const { checkedLogin, isLoggedIn, user } = this.props;
    if (!checkedLogin) {
      return null;
    } else if (isLoggedIn) {
      return (<Dashboard checkedLogin={checkedLogin} isLoggedIn={isLoggedIn} user={user}/>);
    } else {
      return (<Landing checkedLogin={checkedLogin} isLoggedIn={isLoggedIn}/>);
    }
  }
}

export default Home;
