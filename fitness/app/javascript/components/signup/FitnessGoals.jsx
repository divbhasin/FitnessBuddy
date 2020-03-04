import React from 'react';
import { Button, ButtonGroup, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

class FitnessGoals extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  }

  handleChange(event) {
    event.preventDefault();
    this.props.handleChange(event);
    // The form fields on this page have no possibility for input errors.
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.values['errors'] = {};
    this.props.handleSubmit(event);
  }
  
  render() {
    const { values } = this.props;
    const backend_errors = this.props.values['errors'];
    const isButtonEnabled = values.activity_level.length > 0 &&
                            values.fitness_goal.length > 0;
    let alert;

    if (Object.keys(backend_errors).length > 0) {
      alert =
        <div className="alert alert-danger" role="alert">
          {Object.keys(backend_errors).map((key, _) => (
            <p>{key}: {backend_errors[key]}</p>
          ))}
        </div>;
    }

    return (
      <div className="signup">
        <h1>Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
          {alert}
          <FormGroup controlId="activity_level" bsSize="large">
            <FormLabel>Activity Level</FormLabel>
            <FormControl
              autoFocus
              name="activity_level"
              as="select"
              defaultValue={values.activity_level || "Default"}
              onChange={this.handleChange}>
              <option disabled value="Default">Choose Activity Level...</option>
              <option value="Sedentary">Sedentary</option>
              <option value="Light exercise">Light exercise</option>
              <option value="Moderate exercise">Moderate exercise</option>
              <option value="Heavy exercise">Heavy exercise</option>
              <option value="Athlete">Athlete</option>
            </FormControl>
          </FormGroup>
          <FormGroup controlId="fitness_goal" bsSize="large">
            <FormLabel>Fitness Goal</FormLabel>
            <FormControl
              name="fitness_goal"
              as="select"
              defaultValue={values.fitness_goal || "Default"}
              onChange={this.handleChange}>
              <option disabled value="Default">Choose Fitness Goal...</option>
              <option value="Maintain my weight">Maintain my weight</option>
              <option value="Gain 0.5 lb per week">Gain 0.5 lb per week</option>
              <option value="Gain 1 lb per week">Gain 1 lb per week</option>
              <option value="Lose 0.5 lb per week">Lose 0.5 lb per week</option>
              <option value="Lose 1 lb per week">Lose 1 lb per week</option>
            </FormControl>
          </FormGroup>
          <div className="d-flex flex-column">
            <ButtonGroup>
              <Button onClick={this.back}>Back</Button>
              <Button disabled={!isButtonEnabled} type="submit">Sign Up</Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }
}

export default FitnessGoals
