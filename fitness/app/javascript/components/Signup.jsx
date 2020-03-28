import React from 'react';
import axios from 'axios';
import Credentials from './signup/Credentials'
import PersonalDetails from './signup/PersonalDetails'
import FitnessGoals from './signup/FitnessGoals'
import './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      confirm_password: '',
      gender: '',
      age: '',
      weight: '',
      height: '',
      activity_level: '',
      fitness_goal: '',
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  nextStep = () => {
    const { step } = this.state
    this.setState({
      step: step + 1
    })
  }

  prevStep = () => {
    const { step } = this.state
    this.setState({
      step: step - 1
    })
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      weight: this.state.weight,
      height: this.state.height,
      gender: this.state.gender,
      age: this.state.age,
      activity_level: this.state.activity_level,
      fitness_goal: this.state.fitness_goal
    }

    axios.post('/api/users', { user }, { withCredentials: true })
      .then(({ data }) => {
        if ('errors' in data) {
          this.setState( { errors: data.errors } )
        } else {
          this.props.handleLogin(data)
          this.props.history.push('/')
        }
      })
      .catch(errs => { console.log(errs) })
  }

  render() {
    const { step } = this.state;
    const { checkedLogin, isLoggedIn } = this.props;
    const { first_name, last_name, email, password, confirm_password, gender, age, height, weight, activity_level, fitness_goal, errors } = this.state;
    const values = { first_name, last_name, email, password, confirm_password, gender, age, height, weight, activity_level, fitness_goal, errors };
    
    if (checkedLogin && isLoggedIn) {
      this.props.history.push('/');
    }

    switch (step) {
      case 1:
        return <Credentials
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          validateForm={this.validateForm}
          values={values} />
      case 2:
        return <PersonalDetails
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          handleChange={this.handleChange}
          validateForm={this.validateForm}
          values={values} />
      case 3:
        return (
          <FitnessGoals
          prevStep={this.prevStep}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          validateForm={this.validateForm}
          values={values} />
        )
    }
  }
}

export default Signup
