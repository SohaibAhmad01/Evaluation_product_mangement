import React from "react";
import { Container } from "react-bootstrap";
import { Button, NavDropdown,Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Headers() {
  const navigate = useNavigate();
  const logOutHandler = () => {
    sessionStorage.removeItem('userInfo');
    navigate("/");
  };
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Sohaib Ahmad Evaluation Task</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {sessionStorage.userInfo ? (
            <NavDropdown
              title={JSON.parse(sessionStorage.userInfo)?.first_name}
            >
              <NavDropdown.Item>
                <LinkContainer to="/dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOutHandler}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            // <Button to="/dashboard">
            //   {JSON.parse(sessionStorage.userInfo)?.first_name} Dashboard
            // </Button>
            <Link to='/signin'> Sign IN </Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
