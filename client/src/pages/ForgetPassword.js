import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './pages.css';
import { Link } from 'react-router-dom';

export default function ForgetPassword() {
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
    <div className='forgetpassword-container'>
      <Form className='forgetpassword-form' noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="sendEmail">
          <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required/>
            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">Please enter your email.</Form.Control.Feedback>
        </Form.Group>
        <div className='forgetpassword-button-container'>
          <Button variant="warning" type="submit" className='forgetpassword-button'>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}
