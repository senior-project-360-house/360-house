import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withFirebase } from "../../server/Firebase/index";
import SingleHome from "./SingleHome";
import HomeCarousel from "./HomeCarousel";
import SingleAgent from "./SingleAgent";
import NavBars from "./NavBar";
import "./style.css";
class Overview extends React.Component {
  render() {
    return (
      <div className="MyOverview">
        <NavBars />
        <div className="Overview">
          <Container
            fluid="true"
            bsPrefix="container"
          >
            <Row>
              <Col className="left" md="3">
                <SingleHome />
              </Col>
              <Col className="middle" md="7">
                <HomeCarousel />
              </Col>
              <Col className="right" md="2">
                <SingleAgent />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default withFirebase(Overview);
