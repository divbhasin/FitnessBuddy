import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    const { checkedLogin, isLoggedIn } = this.props;
    if (!checkedLogin) {
      return null;
    }

    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">MyFitnessApp 💪</h1>
          <p className="lead">
            Free online calorie counter and diet plan tracker.
          </p>
          <hr className="my-4" />
          <Link to="/signup" className="btn btn-lg custom-button mr-2" role="button">Sign Up</Link>
          <Link to="/login" className="btn btn-lg custom-button ml-2" role="button">Log In</Link>
        </div>
      </div>
    );
  }
}

export default Landing;
