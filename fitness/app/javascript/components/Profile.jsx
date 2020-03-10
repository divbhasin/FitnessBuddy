import React from 'react';
import Form from 'react-bootstrap/Form';
import {withRouter} from "react-router";
import {Col, Button} from 'react-bootstrap';
import './Login.css';

const activity_mappings = {
    1: 'Sedentary Excercise',
    2: 'Light Excercise',
    3: 'Moderate Excercise',
    4: 'Heavy Excercise',
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
    render() {
        const { isLoggedIn, user } = this.props;
        user.fitness_goal = goal_mappings[user.goal_id]
        user.activity_level = activity_mappings[user.activity_level_id]

        return (
            <div className="login">
            <Form>
                <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" readOnly defaultValue={user.email} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridFirst">
                        <Form.Label>First name</Form.Label>
                        <Form.Control readOnly defaultValue={user.first_name} />
                    </Form.Group>

                    <Form.Group controlId="formGridLast">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control readOnly defaultValue={user.last_name} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAge">
                    <Form.Label>Age</Form.Label>
                    <Form.Control readOnly defaultValue={user.age} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control readOnly defaultValue={user.gender} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridHeight">
                        <Form.Label>Height</Form.Label>
                        <Form.Control readOnly defaultValue={user.height} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridWeight">
                        <Form.Label>Weight</Form.Label>
                        <Form.Control readOnly defaultValue={user.weight} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridGoal">
                    <Form.Label>Goal</Form.Label>
                    <Form.Control readOnly defaultValue={user.fitness_goal} />
                </Form.Group>

                <Form.Group controlId="formGridActivity">
                    <Form.Label>Activity Level</Form.Label>
                    <Form.Control readOnly defaultValue={user.activity_level} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Edit Profile
                </Button>
            </Form>
            </div>
        )
    }
}

export default withRouter(Profile)