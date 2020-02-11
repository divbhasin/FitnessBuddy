import React from "react";
import axios from 'axios';

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
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      event.preventDefault();
      const { name, value } = event.target;
      this.setState( { [name] : value} );
      let errors = this.state.errors;

      switch (name) {
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
        default:
          break;
      }
    }

    handleSubmit(event) {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
          this.setState({
              errors: {}
          })

          const user = { first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
          }
          axios.post('/api/v1/users', { user: user } )
            .then(({ data }) => { 
              if ('errors' in data) {
                this.setState( { errors: data.errors } )
              } else {
                window.location.href = '/'
              }
            })
            .catch(errs => { console.log(errs) })
        } else {
          // do nothing. error should already be displayed.
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
            Email:
            <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

export default CreateUserForm
