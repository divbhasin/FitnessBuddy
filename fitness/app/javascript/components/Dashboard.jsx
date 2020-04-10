import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { ProgressBar, Card } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const activity_factors = {
    0: 1.2,
    1: 1.375,
    2: 1.55,
    3: 1.725,
    4: 1.9
}

const multiplier = {
    0: -0.2,
    1: -0.1,
    2: 0,
    3: 0.1,
    4: 0.2
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: 
      [{
        dataField: 'food_id',
        hidden: 'true',
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'servings',
        text: 'Servings (size of 100g)'
      }],
      history: [],
      isLoading: true,
      tdee: this.calcTDEE(props.user),  
    }
  }


  calcTDEE = (user) => {
    console.log(user)
    var bmr = 0
    if (user.gender == 'male') {
      bmr = 66 + (13.7 * user.weight) + (5 * user.height) - (6.8 * user.age)
    }
    else {
      bmr = 655 + (9.6 * user.weight) + (1.8 * user.height) - (4.7 * user.age)
    }

    const tdee = activity_factors[user.activity_level_id] * bmr
    const goal_calories = (1 + multiplier[user.goal_id]) * tdee
    goal_calories = Number((goal_calories).toFixed(1))

    return goal_calories 
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
          <h3 className="display-4">Today</h3>
          <BootstrapTable 
            bootstrap4
            hover
            striped
            keyField="food_id" data={ this.state.history } columns={ this.state.columns } /> 

          <Card>
            <Card.Header>Progress</Card.Header>
            <Card.Body>
              <Card.Text>
                Caloric goal: {this.state.tdee} 
              </Card.Text>

            <ProgressBar>
              <ProgressBar striped variant="success" now={35} key={1} />
              <ProgressBar variant="warning" now={20} key={2} />
              <ProgressBar striped variant="danger" now={10} key={3} />
            </ProgressBar>

            </Card.Body>
          </Card>
          
          <Link to="/pick_food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
        </div>
      </div>
    );
  }
}

export default Dashboard;
