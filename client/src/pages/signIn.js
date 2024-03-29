import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pages.css';
import { Link } from 'react-router-dom';

export default function SignIn() {
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
    <div className='signin-container'>
      <Form className='signin-form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required/>
          <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">Please enter your password.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 check-group" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Agree to terms and conditions" 
          feedback="You must agree before submitting."
          feedbackType="invalid"
          required/>
          
          <div className='forget-password-link'>&nbsp;<Link to={'/forgetpassword'}>Forget password?</Link></div>
        </Form.Group>
        <p>New customer? <Link to={'/createaccount'}>Create account</Link></p>
        <div className='signin-button-container'>
          <Button variant="warning" type="submit" className='signin-button'>
            Login
          </Button>
        </div>
      </Form>
      
    </div>
  )
}
