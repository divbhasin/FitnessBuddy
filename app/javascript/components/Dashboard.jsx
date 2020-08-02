import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { ProgressBar, Card, Alert, Button, Col, Form, Modal, Spinner } from 'react-bootstrap';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';

const quotes = [
  "The last three or four reps is what makes the muscle grow. This area of pain divides a champion from someone who is not a champion.",
  "Success usually comes to those who are too busy to be looking for it.",
  "All progress takes place outside the comfort zone.",
  "If you think lifting is dangerous, try being weak. Being weak is dangerous.",
  "The only place where success comes before work is in the dictionary.",
  "The clock is ticking. Are you becoming the person you want to be?",
  "Whether you think you can, or you think you can't, you’re right.",
  "The successful warrior is the average man, with laser-like focus.",
  "You must expect great things of yourself before you can do them.",
  "Action is the foundational key to all success.",
  "Things may come to those who wait, but only the things left by those who hustle.",
  "Well done is better than well said.",
  "All our dreams can come true if we have the courage to pursue them.",
  "A champion is someone who gets up when they can't.",
  "What hurts today makes you stronger tomorrow.",
  "If something stands between you and your success, move it. Never be denied.",
  "If you want something you’ve never had, you must be willing to do something you’ve never done.",
  "You have to think it before you can do it. The mind is what makes it all possible.",
  "Things work out best for those who make the best of how things work out.",
  "Success is walking from failure to failure with no loss of enthusiasm."
]

const NoDataIndication = () => (
  <div className="spinner">
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

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
        text: 'Name',
        sort: true
      }, {
        dataField: 'servings',
        text: 'Amount (in g)',
        sort: true
      }, {
        dataField: 'calories',
        text: 'Calories',
        sort: true
      }, {
        dataField: 'protein',
        text: 'Protein (in g)',
        sort: true
      }, {
        dataField: 'fat',
        text: 'Fat (in g)',
        sort: true
      }, {
        dataField: 'carbs',
        text: 'Carbs (in g)',
        sort: true
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
        this.setState({
          isLoading: false,
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
    const { isLoading, checkedLogin, isLoggedIn, user } = this.props;
    if (!checkedLogin) {
      return null;
    }

    var pb_c = <ProgressBar now={this.state.caloric_progress} />
    var pb_p = <ProgressBar now={this.state.protein_progress} />
    var pb_ca = <ProgressBar now={this.state.carbs_progress} />
    var pb_f = <ProgressBar now={this.state.fats_progress} />

    if (this.state.caloric_progress >= 100) {
      pb_c = <ProgressBar variant="success" now={this.state.caloric_progress} />
    }
    if (this.state.protein_progress >= 100) {
      pb_p = <ProgressBar variant="success" now={this.state.protein_progress} />
    }
    if (this.state.carbs_progress >= 100) {
      pb_ca = <ProgressBar variant="success" now={this.state.carbs_progress} />
    }
    if (this.state.fats_progress >= 100) {
      pb_f = <ProgressBar variant="success" now={this.state.fats_progress} />
    }

    const noDataIndication = isLoading ? <NoDataIndication /> : null;

    return (
      <div className="jumbotron jumbotron-fluid bg-transparent">
        <div className="container secondary-color">
          <h1 className="display-4">Welcome back, {user.first_name}!</h1>
          <p className="lead">
            Get started by <a href='/pick_food'> adding your meals </a> for the day!
          </p>
          <hr className="my-4" />
          <h2>Today's Meals 🍞 🍇</h2>
          {this.state.history.length > 0 && (
          <BootstrapTable 
            bootstrap4
            hover
            striped
            noDataIndication={() => noDataIndication}
            pagination={paginationFactory()}
            keyField="food_id" data={ this.state.history } columns={ this.state.columns } /> 
          )}
          <Link to="/pick_food" className="btn btn-lg custom-button mr-2" role="button">Add Food</Link>
          <hr className="my-4" />

          <h2>Meeting Your Goals 💪</h2>
          <span> Daily dose of motivation: <i> {quotes[Math.floor(Math.random() * quotes.length)]} </i> </span>
          <Card style={{ 'marginTop': '10px' }}>
            <Card.Header>Progress</Card.Header>
            <Card.Body>
              <Card.Text>
                Calories: {this.state.calories || 0} / {this.state.tdee} cal
              </Card.Text>
              <ProgressBar>{pb_c}</ProgressBar>
              <hr className="my-4" />
              <Card.Text>
                Protein: {this.state.protein || 0} / {this.state.protein_goal} g
              </Card.Text>
              <ProgressBar>{pb_p}</ProgressBar>
              <hr className="my-4" />
              <Card.Text>
                Carbs: {this.state.carbs || 0} / {this.state.carbs_goal} g
              </Card.Text>
              <ProgressBar>{pb_ca}</ProgressBar>
              <hr className="my-4" />
              <Card.Text>
                Fat: {this.state.fats || 0} / {this.state.fats_goal} g
              </Card.Text>
              <ProgressBar>{pb_f}</ProgressBar>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
}

export default Dashboard;
