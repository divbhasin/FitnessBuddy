import React from 'react';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class Credentials extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  saveAndContinue = (e) => {
    e.preventDefault()
    if (this.props.validateForm(this.state.errors)) {
      this.setState({
        errors: {}
      })
      this.props.nextStep()
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.props.handleChange(event);
    let errors = this.state.errors;
    
    switch (name) {
      case 'first_name':
        if (value.length == 0) {
          errors.first_name = 'First name cannot be blank!';
        } else {
          delete errors.first_name;
        }
        break;
      case 'last_name':
        if (value.length == 0) {
          errors.last_name = 'Last name cannot be blank!';
        } else {
          delete errors.last_name;
        }
        break;
      case 'email':
        if (!validEmailRegex.test(value)) {
          errors.email = 'Email is not valid!';
        } else {
          delete errors.email;
        }
        break;
      case 'password':
        if (value.length < 8) {
          errors.password = 'Password must be at least 8 characters long!';
        } else {
          delete errors.password;
        }
        break;
      case 'confirm_password':
        if (value != this.props.values['password']) {
          errors.confirm_password = 'Passwords must match!';
        } else {
          delete errors.confirm_password;
        }
        break;
      default:
        break;
    }
  }

  render() {
    const { values } = this.props;
    const { errors } = this.state;
    const isButtonEnabled = Object.keys(errors).length == 0 && 
                            values.first_name.length > 0 &&
                            values.last_name.length > 0 &&
                            values.email.length > 0 &&
                            values.password.length > 0 &&
                            values.confirm_password.length > 0;
    let alert;

    if (Object.keys(errors).length > 0) {
      alert =
        <div className="alert alert-danger" role="alert">
          {Object.keys(errors).map((key, index) => (
            <p key={index}>{key}: {errors[key]}</p>
          ))}
        </div>;
    }

    return (
      <div className="signup">
        <h1>Sign Up</h1>

        <form>
          {alert}
          <FormGroup controlId="first_name" bsSize="large">
            <FormLabel>First Name</FormLabel>
            <FormControl
              autoFocus
              name="first_name"
              type="name"
              defaultValue={values.first_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="last_name" bsSize="large">
            <FormLabel>Last Name</FormLabel>
            <FormControl
              name="last_name"
              type="name"
              defaultValue={values.last_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <FormLabel>Email</FormLabel>
            <FormControl
              name="email"
              type="email"
              defaultValue={values.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              name="password"
              type="password"
              defaultValue={values.password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="confirm_password" bsSize="large">
            <FormLabel>Confirm Password</FormLabel>
            <FormControl
              name="confirm_password"
              type="password"
              defaultValue={values.confirm_password}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            disabled={!isButtonEnabled}
            onClick={this.saveAndContinue}
            bsSize="large">Continue</Button>
        </form>
      </div>
    );
  }
}

export default Credentials
