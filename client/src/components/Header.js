import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './component.css';

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container className='header-container'>
        <Navbar.Brand href="#home">Mini-Amazon</Navbar.Brand>
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
            <Nav.Link href="#home">Cart</Nav.Link>
            <Nav.Link href="#link">Sign In</Nav.Link>
          </div>
          </Nav>
        </Navbar.Collapse>
        </Container>
    </Navbar> 
  )
}
