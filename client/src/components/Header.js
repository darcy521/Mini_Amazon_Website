import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './component.css';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default function Header(props) {
  const userInfo = props;
  // console.log("userinfo", props.name);

  const signoutHandler = () => {
    // localStorage.removeItem();

    window.location.href = '/signin';
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container className='header-container'>
        <Navbar.Brand href="/">Mini-Amazon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav">
            <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <div className='header-right-container'>
            <Nav.Link href="/cart">Cart</Nav.Link>
            {userInfo.name ? (
              <NavDropdown title={userInfo.name} id="nav-dropdown">
                <NavDropdown.Item href='/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item href='/orderhistory'>Order History</NavDropdown.Item>
                <NavDropdown.Item href='#signout' onClick={signoutHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            )
            :
            (<Nav.Link href="/signin">Sign In</Nav.Link>)}
          </div>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
