import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./component.css";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Header(props) {
  let { user, logout } = useAuth();

  const logoutHandler = () => {
    logout();
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary navbar">
      <Container className="header-container">
        <Navbar.Brand as={Link} to={"/"}>
          Mini-Amazon
        </Navbar.Brand>
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
            <div className="header-right-container">
              <Nav.Link as={Link} to={"/cart"}>
                Cart
              </Nav.Link>
              {user && user.name ? (
                <NavDropdown title={user.name} id="nav-dropdown">
                  <NavDropdown.Item as={Link} to={"/profile"}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={"/orderhistory"}>
                    Order History
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to={"/login"}>
                  Login
                </Nav.Link>
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
