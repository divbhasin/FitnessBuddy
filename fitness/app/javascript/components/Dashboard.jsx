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
          <h1>Details</h1>
          <ul>
            <li>
              First name: {user.first_name}
            </li>
            <li>
              Last name: {user.last_name}
            </li>
            <li>
              Email: {user.email}
            </li>
            <li>
              Gender: {user.gender}
            </li>
            <li>
              Height: {user.height}
            </li>
            <li>
              Age: {user.age}
            </li>
            <li>
              Goal: {user.goal_id}
            </li>
            <li>
              Activity Level: {user.activity_level_id}
            </li>
          </ul>
          <Link to="/edit_details" className="btn btn-lg custom-button mr-2" role="button">Edit Details</Link>
          <hr className="my-4" />
          <Link to="/food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
