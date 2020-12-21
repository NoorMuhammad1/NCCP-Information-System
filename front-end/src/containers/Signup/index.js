import React from "react";
import Layout from "../../components/Layout/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input/input";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const Signup = (props) => {
  const auth = useSelector((state) => state.auth);
  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "2rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form>
                <Row>
                  <Col md={6}>
                    <Input
                      id="first_name"
                      label="Fristname"
                      type="text"
                      placeholder="Firstname"
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      id="last_name"
                      label="Lastname"
                      type="text"
                      placeholder="Lastname"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Input
                      id="username"
                      label="Username"
                      type="text"
                      placeholder="username"
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8}>
                    <Form.Label>What type of user are you:</Form.Label>
                    <div key={`default-radio`} className="mb-3">
                      <Form.Check
                        label="Student"
                        type="radio"
                        id={`default-radio-1`}
                        name="user-type"
                      />
                      <Form.Check
                        label="Research Institute Representative"
                        type="radio"
                        id={`default-radio-2`}
                        name="user-type"
                      />
                      <Form.Check
                        label="Industry Representative"
                        type="radio"
                        id={`default-radio-3`}
                        name="user-type"
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Input
                      id="associated-institute-name"
                      label="Associated Institute Name"
                      type="text"
                      placeholder="Institute name"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Form.Group controlId="description-text-area">
                      <Form.Label>Description (of what you do)</Form.Label>
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Input
                      id="password"
                      label="Password"
                      type="password"
                      placeholder="Password"
                    />
                  </Col>
                  <Col md={6}>
                    <Input
                      id="confirm_password"
                      label="Confirm Password"
                      type="password"
                      placeholder="Retype Password"
                    />
                  </Col>
                </Row>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export default Signup;
