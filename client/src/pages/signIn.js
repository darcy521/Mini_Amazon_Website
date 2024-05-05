import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./pages.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignIn() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    fetch("http://localhost:3001/login", {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.status === 200) {
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        let user = data.data;
        login({ name: user.name, role: user.role, email: user.email, _id: user._id });
        navigate('/');
      })
      .catch((err) => console.err(err));

    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="signin-container">
      <Form
        className="signin-form"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your email.
          </Form.Control.Feedback>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="valid">
            Looks good!
          </Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Please enter your password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 check-group" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
            required
          />
          <div className="forget-password-link">
            &nbsp;<Link to={"/forgetpassword"}>Forget password?</Link>
          </div>
        </Form.Group>
        <p>
          New customer? <Link to={"/createaccount"}>Create account</Link>
        </p>
        <div className="signin-button-container">
          <Button variant="warning" type="submit" className="signin-button">
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
