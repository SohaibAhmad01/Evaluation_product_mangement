import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const handleSignIn = (event) => {
    event.preventDefault();
    // Update the credentials state with the user's input
    setCredentials({
      email: event.target.email.value,
      password: event.target.password.value,
    });
  };

  useEffect(() => {
    const signInUser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/auth/login",
          credentials
        );
        sessionStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/dashboard");
        console.log(response.data); // Handle the successful sign-in response here
      } catch (error) {
        console.log(error); // Handle any errors that occur during the sign-in process
      }
    };

    signInUser();
  }, [credentials]);

  return (
    <main>
      <Container>
        <Row>
          <div className="formDiv">
            <h1>SIGN IN PAGE</h1>
          </div>
        </Row>
        <Row>
          <Col>
            <div className="formDiv">
              <Form className="form" onSubmit={handleSignIn}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SignIn;
