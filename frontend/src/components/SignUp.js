import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });
  const handleSignUp = (event) => {
    event.preventDefault();
    setFormdata({
      email: event.target.email.value,
      first_name: event.target.first_name.value,
      last_name: event.target.last_name.value,
      password: event.target.password.value,
    });
  };
  useEffect(() => {
    const signUpUser = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/user/register",
          formdata
        );
        navigate("/signin");
        console.log(response.data); // Handle the successful sign-in response here
      } catch (error) {
        console.log(error); // Handle any errors that occur during the sign-in process
      }
    };

    signUpUser();
  }, [formdata]);
  return (
    <main>
      <Container>
        <Row>
          <div className="formDiv">
            <h1>SIGN UP PAGE</h1>
          </div>
        </Row>
        <Row>
          <Col>
            <div className="formDiv">
              <Form className="form" onSubmit={handleSignUp}>
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
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="Enter First Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Enter LastName"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Sign UP
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default SignUp;
