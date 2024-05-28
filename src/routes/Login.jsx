import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  InputGroup,
  Alert,
  FloatingLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SendLogin } from "../components/fetches/SendLogin.jsx";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    document.title = "Holidaze | Login";
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity()) {
      let data = {
        email: email.toLowerCase(),
        password: password,
      };

      SendLogin(data, setLoginError);
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className=" d-flex flex-column justify-content-center align-items-center bgcolor border rounded  p-5 col-12 col-md-8">
        <h2 className="fs-1 headerfont mb-3 secondarycolor">Log In</h2>
        <Form
          className="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="w-75" controlId="validationCustom01">
            <FloatingLabel controlId="floatingEmail" label="Email (required)">
              <Form.Control
                required
                type="email"
                pattern="^[^\s@]+@stud\.noroff\.no$"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Must be a valid noroff student email
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Form.Group className="w-75" controlId="validationCustomPassword">
            <FloatingLabel
              controlId="floatingPassword"
              label="Password (required)"
            >
              <Form.Control
                className="mt-2"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a password.
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="buttoncolor rounded  noborder m-3" type="submit">
            Login
          </Button>
          <p className="secondarycolor">
            Don't have a user yet? <Link to={"/register"}>Sign up</Link>
          </p>

          {loginError && (
            <Alert variant="danger" className="mt-3">
              {loginError}
            </Alert>
          )}
        </Form>
      </div>
    </div>
  );
}
