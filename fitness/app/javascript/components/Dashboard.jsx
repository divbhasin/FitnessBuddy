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
        text: 'Amount (in g)'
      }, {
        dataField: 'calories',
        text: 'Calories'
      }, {
        dataField: 'protein',
        text: 'Protein (in g)'
      }, {
        dataField: 'fat',
        text: 'Fat (in g)'
      }, {
        dataField: 'carbs',
        text: 'Carbs (in g)'
      }],
      history: [],
      isLoading: true,
      caloric_progress: 0,
      tdee: 0,
      calories: 0,
      carbs: 0,
      fats: 0,
      protein: 0,
      protein_progress: 0,
      fats_progress: 0,
      carbs_progress: 0,
      protein_goal: 0,
      fats_goal: 0,
      carbs_goal: 0
    }
  }

  getHistory = () => {
    axios.get('/api/daily_analytics')
      .then(({ data }) => {
        console.log(data)
        this.setState({
          history: data.daily_history,
          caloric_progress: parseInt(100 * data.progress[0].caloric_progress),
          tdee: Math.round(data.tdee),
          calories: parseInt(data.progress[0].calories),
          protein: parseInt(data.progress[0].protein),
          fats: parseInt(data.progress[0].fats),
          carbs: parseInt(data.progress[0].carbs),
          protein_progress: parseInt(100 * data.progress[0].protein_progress),
          carbs_progress: parseInt(100 * data.progress[0].carbs_progress),
          fats_progress: parseInt(100 * data.progress[0].fats_progress),
          protein_goal: Math.round(data.protein_goal),
          fats_goal: Math.round(data.fats_goal),
          carbs_goal: Math.round(data.carbs_goal)
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

    var pb_c = <ProgressBar now={this.state.caloric_progress} label={`${this.state.calories} calories`} />
    var pb_p = <ProgressBar now={this.state.protein_progress} label={`${this.state.protein} g of protein`} />
    var pb_ca = <ProgressBar now={this.state.carbs_progress} label={`${this.state.carbs} g of carbs`} />
    var pb_f = <ProgressBar now={this.state.fats_progress} label={`${this.state.fats} g of fats`} />

    if (this.state.caloric_progress >= 100) {
      pb_c = <ProgressBar variant="success" now={this.state.caloric_progress} label={`${this.state.calories} calories`} />
    }
    if (this.state.protein_progress >= 100) {
      pb_p = <ProgressBar variant="success" now={this.state.protein_progress} label={`${this.state.protein}g of protein`} />
    }
    if (this.state.carbs_progress >= 100) {
      pb_ca = <ProgressBar variant="success" now={this.state.carbs_progress} label={`${this.state.carbs}g of carbs`} />
    }
    if (this.state.fats_progress >= 100) {
      pb_f = <ProgressBar variant="success" now={this.state.fats_progress} label={`${this.state.fats}g of fat`} />
    }

    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Welcome</h1>
          <p className="lead">
          {user.first_name}, get started by adding your meals for the day!
          </p>
          <Link to="/pick_food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
          <hr className="my-4" />
          <h3 className="display-5">Today</h3>
          <BootstrapTable 
            bootstrap4
            hover
            striped
            keyField="food_id" data={ this.state.history } columns={ this.state.columns } /> 

          <Card>
            <Card.Header>Progress</Card.Header>
            <Card.Body>
              <Card.Text>
                Caloric goal: {this.state.tdee} calories 
              </Card.Text>
              {pb_c}
              <hr className="my-4" />
              <Card.Text>
                Protein goal: {this.state.protein_goal} g of protein 
              </Card.Text>
              {pb_p}
              <hr className="my-4" />
              <Card.Text>
                Carbs goal: {this.state.carbs_goal} g of carbs 
              </Card.Text>
              {pb_ca}
              <hr className="my-4" />
              <Card.Text>
                Fat goal: {this.state.fats_goal} g of fat 
              </Card.Text>
              {pb_f}

            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
