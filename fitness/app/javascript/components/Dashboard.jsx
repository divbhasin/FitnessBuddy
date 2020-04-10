import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 
      [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'servings',
        text: 'Servings (size of 100g)'
      }],
      history: [],
      isLoading: true
    }
  }

  
  formatDate() {
        var d = new Date(),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) 
              month = '0' + month;
        if (day.length < 2) 
              day = '0' + day;

        return [year, month, day].join('-');
  }

  filterToday(history) {
    const today = this.formatDate()
    var new_history = []
    for (var h of history) {
      if (h.created_at === today)
        new_history.push(h)
    }
    return new_history
  }

  getHistory = () => {
    axios.get('/api/food_histories')
      .then(({ data }) => {
        this.setState({
          history: this.filterToday(data.food_history),
          isLoading: false
        });
      })
      .catch(error => console.log('api errors:', error))
  }

  componentDidMount() {
    this.getHistory()
  }

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
          <h2 className="display-4">Today</h2>
          <BootstrapTable keyField="food_id" data={ this.state.history } columns={ this.state.columns } /> 
          <Link to="/pick_food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
