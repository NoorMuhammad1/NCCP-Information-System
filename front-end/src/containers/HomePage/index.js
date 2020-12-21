import React from "react";
import { Jumbotron } from "react-bootstrap";
import Layout from "../../components/Layout/index";
const HomePage = (props) => {
  return (
    <>
      <Layout>
        <Jumbotron>
          <h1>HomePage</h1>
        </Jumbotron>
      </Layout>
    </>
  );
};

export default HomePage;
