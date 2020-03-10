import React from 'react';
import Form from 'react-bootstrap/Form';
import {withRouter} from "react-router";
import {Col, Button} from 'react-bootstrap';
import './Login.css';

class Profile extends React.Component {
    render() {
        const { isLoggedIn, user } = this.props;
        return (
            <div className="login">
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" readonly defaultValue={user.email} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridFirst">
                    <Form.Label>First name</Form.Label>
                    <Form.Control readonly defaultValue={user.first_name} />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Address 2</Form.Label>
                    <Form.Control placeholder="Apartment, studio, or floor" />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        )
    }
}

export default withRouter(Profile)