import React from 'react';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {withRouter} from "react-router";
import {Col, Button} from 'react-bootstrap';
import './Login.css';

const activity_mappings = {
    1: 'Sedentary exercise',
    2: 'Light exercise',
    3: 'Moderate exercise',
    4: 'Heavy exercise',
    5: 'Athlete'
}

const goal_mappings = {
    1: 'Maintain my weight',
    2: 'Gain 0.5 lb per week',
    3: 'Gain 1 lb per week',
    4: 'Lose 0.5 lb per week',
    5: 'Lose 1 lb per week'
}



class Profile extends React.Component {
    constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    handleSubmit(event) {
      event.preventDefault();

      const user = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.props.user.email,
        password: this.state.password,
        weight: this.state.weight,
        height: this.state.height,
        gender: this.state.gender,
        age: this.state.age,
        activity_level: this.state.activity_level,
        fitness_goal: this.state.fitness_goal
      }
      
      axios.put('/api/users/0', { user })
      .then(({ data }) => {
        if ('errors' in data) {
          this.setState( { errors: data.errors } )
        } else {
          this.props.history.push('/')
        }
      })
      .catch(errs => { console.log(errs) })
    }

    render() {
        const { isLoggedIn, user } = this.props;
        user.fitness_goal = goal_mappings[user.goal_id]
        user.activity_level = activity_mappings[user.activity_level_id]
        console.log(user)
        console.log(this.state)

        return (
            <div className="login">
            <form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" readOnly defaultValue={user.email} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirst">
                        <Form.Label>First name</Form.Label>
                        <Form.Control name="first_name" defaultValue={user.first_name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formGridLast">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control name = "last_name" defaultValue={user.last_name} onChange={this.handleChange}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control name="age" defaultValue={user.age} onChange={this.handleChange}/>
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control name="gender" defaultValue={user.gender} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control name="height" defaultValue={user.height} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control name="weight" defaultValue={user.weight} onChange={this.handleChange}/>
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridGoal">
                  <Form.Label>Goal</Form.Label>
                    <Form.Control value={this.state ? this.state.fitness_goal : user.fitness_goal} name="fitness_goal" as="select" onChange={this.handleChange}>
                      <option>{goal_mappings[1]}</option>
                      <option>{goal_mappings[2]}</option>
                      <option>{goal_mappings[3]}</option>
                      <option>{goal_mappings[4]}</option>
                      <option>{goal_mappings[5]}</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="formGridActivity">
                    <Form.Label>Activity Level</Form.Label>
                  <Form.Control value={this.state ? this.state.activity_level : user.activity_level} as="select" name="activity_level" onChange={this.handleChange}>
                    <option>{activity_mappings[1]}</option>
                    <option>{activity_mappings[2]}</option>
                    <option>{activity_mappings[3]}</option>
                    <option>{activity_mappings[4]}</option>
                    <option>{activity_mappings[5]}</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Edit Profile
                </Button>
            </form>
            </div>
        )
    }
}

export default withRouter(Profile)
