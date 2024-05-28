import React, { useState } from "react";
import { Form, Button, InputGroup, FloatingLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SendRegister } from "../components/fetches/SendRegister.jsx";
import { SendLogin } from "../components/fetches/SendLogin.jsx";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [validated, setValidated] = useState(false);
  useEffect(() => {
    document.title = "Holidaze | Register";
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity()) {
      let data = {
        name: username,
        email: email.toLowerCase(),
        password: password,
        bio: "",
        avatar: {
          url: "https://static.vecteezy.com/system/resources/thumbnails/001/840/618/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
          alt: username + "'s avatar",
        },
        banner: {
          url: "https://tinkercademy.com/wp-content/uploads/2017/04/Generic-Banner-05-Android-Dev.png",
          alt: username + "'s banner",
        },
      };

      SendRegister(data)
        .then((responseData) => {
          SendLogin({ email: data.email, password: data.password });
          console.log("User registered successfully:", responseData);
        })
        .catch((error) => {
          console.error("Error occurred during registration:", error);
        });

      setValidated(true);
    } else {
      event.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 col-12">
      <div className="d-flex flex-column justify-content-center align-items-center bgcolor border rounded col-12 col-md-8 p-5">
        <h1 className="fs-1 headerfont mb-3 secondarycolor">
          Register an account
        </h1>
        <Form
          className="gap-2 col-11 md-col-8 d-flex flex-column justify-content-center align-items-center"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group className="w-75" controlId="validationCustomUsername">
            <FloatingLabel
              controlId="floatingUsername"
              label="Username (required)"
            >
              <Form.Control
                required
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Must be at least 8 characters long
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="w-75" controlId="validationCustomEmail">
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
                Must be a valid Noroff student email
              </Form.Control.Feedback>
            </FloatingLabel>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="w-75" controlId="validationCustomPassword">
            <FloatingLabel
              controlId="floatingPassword"
              label="Password (required)"
            >
              <Form.Control
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
              />
              <Form.Control.Feedback type="invalid">
                Must be at least 8 characters long
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>

          <Button className="m-3" type="submit">
            Register
          </Button>
          <p className="secondarycolor">
            Don't have a user yet? <Link to={"/register"}>Sign up</Link>
          </p>
          <Form.Control.Feedback className="loginerror" type="invalid">
            Something went wrong with the login
          </Form.Control.Feedback>
          <Form.Control.Feedback className="registererror" type="invalid">
            Something went wrong with the registration
          </Form.Control.Feedback>
        </Form>
      </div>
    </div>
  );
}
