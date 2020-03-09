import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';

class Dashboard extends Component {
  render() {
    // const { checkedLogin, isLoggedIn, user } = this.props;
    // if (!checkedLogin) {
    //   return null;
    // }

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Welcome!</h1>
          <p className="lead">
          {user.email}, get started by adding your meals for the day!
          </p>
          <hr className="my-4" />
          <BootstrapTable keyField='id' data={ user } columns={ columns } />
          <Link to="/food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
