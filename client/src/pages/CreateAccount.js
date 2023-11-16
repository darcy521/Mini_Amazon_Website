import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pages.css';
import { Link } from 'react-router-dom';

export default function CreateAccount() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  }

  return (
    <div className='createaccount-container'>
      <Form className='createaccount-form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="createName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="createEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="createPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please confirm your password.</Form.Control.Feedback>
        </Form.Group>

        <p>Already have an account? <Link to={'/signin'}>Sign In</Link></p>
        <div className='signin-button-container'>
          <Button variant="warning" type="submit" className='signup-button'>
            Sign Up
          </Button>
        </div>
      </Form>
      
    </div>
  )
}
