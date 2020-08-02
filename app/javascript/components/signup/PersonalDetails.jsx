import React from 'react';
import { Button, ButtonGroup, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class PersonalDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
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
      case 'age':
        if (value < 1 || value.length == 0) {
          errors.age = 'Invalid age!';
        } else {
          delete errors.age;
        }
        break;
      case 'weight':
        if (value < 1 || value.length == 0) {
          errors.weight = 'Invalid weight!';
        } else {
          delete errors.weight;
        }
        break;
      case 'height':
        if (value < 1 || value.length == 0) {
          errors.height = 'Invalid height!';
        } else {
          delete errors.height;
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
                            values.gender.length > 0 &&
                            values.age.length > 0 &&
                            values.weight.length > 0 &&
                            values.height.length > 0;
    let alert;

    if (Object.keys(errors).length > 0) {
      alert =
        <div className='alert alert-danger' role='alert'>
          {Object.keys(errors).map((key, _) => (
            <div>{key}: {errors[key]}</div>
          ))}
        </div>;
    }

    return (
      <div className="signup">
        <h1>Sign Up</h1>

        <form>
          {alert}
          <FormGroup controlId="gender" bsSize="large">
            <FormLabel>Gender</FormLabel>
            <FormControl
              autoFocus
              name="gender"
              as="select"
              defaultValue={values.gender || "Default"}
              onChange={this.handleChange}>
              <option disabled value="Default">Choose Gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="age" bsSize="large">
            <FormLabel>Age</FormLabel>
            <FormControl
              name="age"
              type="number"
              min="1"
              max="100"
              step="1"
              defaultValue={values.age}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="weight" bsSize="large">
            <FormLabel>Weight (lbs)</FormLabel>
            <FormControl
              name="weight"
              type="number"
              min="1"
              max="1000"
              step="1"
              defaultValue={values.weight}
              onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="height" bsSize="large">
            <FormLabel>Height (cm)</FormLabel>
            <FormControl
              name="height"
              type="number"
              min="1"
              max="200"
              step="1"
              defaultValue={values.height}
              onChange={this.handleChange} />
          </FormGroup>
          <div className="d-flex flex-column">
            <ButtonGroup>
              <Button onClick={this.back}>Back</Button>
              <Button disabled={!isButtonEnabled} onClick={this.saveAndContinue}>Continue</Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }
}

export default PersonalDetails
