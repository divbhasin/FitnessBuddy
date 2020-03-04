import React from 'react';
import axios from 'axios';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from "react-router";

class MyNavBar extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => {
    axios.delete('/api/logout', { withCredentials: true })
    .then(_ => {
      this.props.handleLogout()
      this.props.history.push('/')
    })
    .catch(error => console.log(error))
  }

  render() {
    const { checkedLogin, isLoggedIn, user } = this.props;
    if (!checkedLogin) {
      return null;
    }

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">MyFitnessApp</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn && <Navbar.Text>Signed in as: {user.email}</Navbar.Text>}
          {isLoggedIn && <Nav.Link href="#" onClick={this.handleClick}>Logout</Nav.Link>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(MyNavBar)
