import React from 'react';
import axios from 'axios';
import { Button, FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import './Login.css';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

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
  }

  componentWillMount() {
    return this.props.isLoggedIn ? this.redirect() : null
  }
  
  redirect = () => {
    this.props.history.push('/')
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
    let errors = this.state.errors;
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

    axios.post('/api/login', { user: user }, { withCredentials: true })
      .then(({ data }) => {
        if ('errors' in data) {
          this.setState( { errors: data.errors } )
        } else {
          this.props.handleLogin(data)
          this.redirect()
        }
      })
      .catch(errs => { console.log(errs) })
  }

  render() {
    const { email, password, errors } = this.state;
    const { checkedLogin, isLoggedIn } = this.props;
    const isButtonEnabled = validEmailRegex.test(email) && email.length > 0 && password.length > 0;
    let alert;
    
    if (checkedLogin && isLoggedIn) {
      this.props.history.push('/');
    }

    if (Object.keys(errors).length > 0) {
      alert =
        <div className='alert alert-danger' role='alert'>
          {Object.keys(errors).map((key, _) => (
            <div>{errors[key]}</div>
          ))}
        </div>;
    }

    return (
      <div className='login'>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          {alert}
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
