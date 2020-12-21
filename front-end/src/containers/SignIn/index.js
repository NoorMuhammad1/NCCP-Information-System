import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout/index";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input/input";
import { login } from "../../actions";
import { useState } from "react";
import { Redirect } from "react-router-dom";
const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [errors, setErrors] = useState("");
  const auth = useSelector((state) => state.auth);
  //const us = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };

    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to={"/"} />;
  }
  return (
    <>
      <Layout>
        <Container>
          <Row style={{ marginTop: "2rem" }}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userLogin}>
                <Input
                  id="email_username"
                  label="Email/Username"
                  type="email"
                  value={email}
                  placeholder="Email/Username"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  id="basicPassword"
                  label="Password"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
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

export default Signin;
