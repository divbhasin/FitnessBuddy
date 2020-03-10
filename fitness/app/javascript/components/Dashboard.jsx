import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Dashboard extends Component {
  render() {
    const { checkedLogin, isLoggedIn, user } = this.props;
    if (!checkedLogin) {
      return null;
    }

    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Welcome!</h1>
          <p className="lead">
          {user.email}, get started by adding your meals for the day!
          </p>
          <hr className="my-4" />
          <Link to="/food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
