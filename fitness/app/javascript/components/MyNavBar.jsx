import React from 'react';
import axios from 'axios';
import { Navbar, Nav, DropdownButton, Dropdown} from 'react-bootstrap';
import Link from "react-router-dom/Link";
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

  redirectToProfile = () => {
    this.props.history.push('/user/profile')
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
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Daily View</Nav.Link>
          <Nav.Link href="/history">History</Nav.Link>
        </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {isLoggedIn && <DropdownButton title={user.email} variant="info">
            <Dropdown.Item onClick={this.redirectToProfile}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={this.handleClick}>Logout</Dropdown.Item>
          </DropdownButton>}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(MyNavBar)
