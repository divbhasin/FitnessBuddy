import React from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentWillMount() {
    return this.props.isLoggedIn ? this.redirect() : null
  }
  
  redirect = () => {
    this.props.history.push('/')
  }

  validateForm(errors) {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
  
    this.setState({
      errors: {}
    })

    const user = {
      email: this.state.email.toLowerCase(),
      password: this.state.password
    }
    /*
    axios.post('/api/v1/users', { user: user })
      .then(({ data }) => {
        if ('errors' in data) {
          this.setState( { errors: data.errors } )
        } else {
          window.location.href = '/'
        }
      })
      .catch(errs => { console.log(errs) })
    */
  }

  render() {
    const { email, password } = this.state;
    const isButtonEnabled = email.length > 0 && password.length > 0;

    return (
      <div className='login'>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId='email' bsSize='large'>
            <FormLabel>Email</FormLabel>
            <FormControl
              name='email'
              type='email'
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId='password' bsSize='large'>
            <FormLabel>Password</FormLabel>
            <FormControl
              name='password'
              type='password'
              onChange={this.handleChange}
            />
          </FormGroup>   
          <Button block disabled={!isButtonEnabled} bsSize='large' type='submit'>Log In</Button>
        </form>
      </div>
    );
  }
}

export default Login
