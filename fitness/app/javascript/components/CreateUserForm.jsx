import React from "react";
const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
}

class CreateUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: null,
            lastName: null,
            email: null,
            password: null,
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'email': 
            errors.email = 
                validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
            case 'password': 
            errors.password = 
                value.length < 8
                ? 'Password must be 8 characters long!'
                : '';
            break;
            default:
            break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
          this.setState({
              errors: {}
          })
        }else{
            this.setState(this.state.errors)
        }
    }

    render() {
      const {errors} = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
        {Object.keys(errors).map((key, index) => (
            <p key={index}>{key}: {errors[key]}</p>
        ))}
          <h1>Sign Up</h1>
          <label>
            First Name:
            <input type="text" name="first_name" />
          </label>
          <br />
          <label>
            Last Name:
            <input type="text" name="last_name" />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={this.handleChange}/>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default CreateUserForm