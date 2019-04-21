import React, { Component } from "react";

import * as ROUTES from "../../constants/routes";

import { Container, Button } from "react-bootstrap";

import { withFirebase } from "../../server/Firebase/index";
import Card from "react-bootstrap/Card";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Nav from "react-bootstrap/Nav";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./style.css";
import Request from "./MessageRequest";

const authUser = JSON.parse(localStorage.getItem("authUser"));

let path;
let remember;

let lastInfor;
class Agent extends Component {
  constructor(props) {
    super(props);
    path = this.props.history;
    lastInfor = this.props.history.location.state;

    console.log(authUser.isAgent);
    this.state = {
      houses: [
        {
          imageX:
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb",
          address: "124 ohonadf",
          price: "$1"
        },
        {
          imageX:
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb",
          address: "nha so 2 ohonadf",
          price: "$2"
        },
        {
          imageX:
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb",
          address: "nha so 2 ohonadf",
          price: "$3"
        },
        {
          imageX:
            "https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?h=350&auto=compress&cs=tinysrgb",
          address: "nha so 2 ohonadf",
          price: "$4"
        }
      ],
      caseNum: 0,
      isLoading: false,
      hide: false,
      request: false,
      dis: [],
      authUser: {}
    };
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.handleToggleRequest = this.handleToggleRequest.bind(this);
    this.requestToggle = this.requestToggle.bind(this);
    this.viewAsBuyer = this.viewAsBuyer.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      hide: !prevState.hide,
      caseNum: 0
    }));
  }

  handleToggleRequest() {
    this.setState(prevState => ({
      request: !prevState.request,
      caseNum: 1
    }));
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    this.props.firebase.database.ref("account").on("value", snapshot => {
      const data = snapshot.val().agentAccount;
      let newState = [];
      let imgs = data.agentAccount1;
      newState.push({
        email: imgs.email,
        isAgent: imgs.isAgent,
        password: imgs.password
      });
      this.setState({ dis: newState, authUser: authUser, isLoading: false });
    });
  }

  editaccount() {
    path.push(
      {
        pathname: "/agenteditaccount"
      },
      remember
    );
  }

  viewAsBuyer() {
    this.handleToggleClick();
    if ((document.getElementById("nav128_02").value = "FIND A HOME")) {
      document.getElementById("nav128_02").classList.remove("activeNav");
      document.getElementById("nav128_01").classList.add("activeNav");
    }
    //  else {
    //   document.getElementById("nav128_02").classList.remove("activeNav");
    //   document.getElementById("nav128_01").classList.add("activeNav");
    //   document.getElementById("nav128_03").classList.remove("activeNav");
    // }
  }
  requestToggle() {
    document.getElementById("nav128_02").classList.add("activeNav");
    document.getElementById("nav128_01").classList.remove("activeNav");
    document.getElementById("nav128_03").classList.remove("activeNav");

    this.setState(prevState => ({
      request: !prevState.request,
      caseNum: 1
    }));
  }
  renderRightSide() {
    switch (this.state.caseNum) {
      case 1:
        return this.renderViewRequest();
      case 0:
        return this.renderOpenHouseList();
      default:
        return this.renderOpenHouseList();
    }
  }

  renderViewRequest() {
    return <Request />;
  }
  renderOpenHouseList() {
    const renderListHouse = this.state.houses.map(house => {
      return this.formBuild(house);
    });
    return <div>{renderListHouse}</div>;
  }
  formBuild(aHouses) {
    return (
      <div className="XXcol-1-2-128">
        <div className="HouseInfo128">
          <Image src={aHouses.imageX} alt="" />
          <h2>
            Price: {aHouses.price}
            <br />
            {aHouses.address}
          </h2>
        </div>
        <div
          style={
            this.state.hide
              ? { visibility: "hidden" }
              : { visibility: "visible" }
          }
          className="btnDeleteAgent128"
        >
          <Button variant="danger">Delete</Button>
          <Button variant="primary">Edit</Button>
        </div>
      </div>
    );
  }

  render() {
    // console.log(this.state.dis.isAgent);
    const { isLoading, authUser } = this.state;
    return (
      <div className="AgentContent128">
        {isLoading ? (
          <h1>We are Loading!!!</h1>
        ) : (
          <div>
            <Nav className="justify-content-center" activeKey="/home">
              <Nav.Item>
                <Nav.Link>
                  <span
                    id="nav128_01"
                    className="textNav activeNav"
                    onClick={() => {
                      document
                        .getElementById("nav128_01")
                        .classList.add("activeNav");
                      document
                        .getElementById("nav128_02")
                        .classList.remove("activeNav");

                      document
                        .getElementById("nav128_03")
                        .classList.remove("activeNav");
                      this.setState(prevState => ({
                        // request: !prevState.request,
                        caseNum: 0
                      }));
                    }}
                  >
                    {!this.state.hide ? "OPEN HOUSES" : ""}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href={!this.state.hide ? "" : ROUTES.HOMEPAGE}>
                  <span
                    // onClick={!this.state.hide ? this.handleToggleRequest : {}}
                    onClick={this.requestToggle}
                    id="nav128_02"
                    className="textNav"
                  >
                    {() => {}}
                    {!this.state.hide ? "VIEW REQUESTS" : "FIND A HOME"}
                  </span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link>
                  <span
                    id="nav128_03"
                    onClick={this.viewAsBuyer}
                    className="textNav"
                  >
                    {!this.state.hide ? "VIEW AS BUYER" : "BACK"}
                  </span>
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <div className="row">
              <div className="Left128 col-sm-3">
                {/* <p>Left</p> */}
                <Card
                  style={{ "box-shadow": "5px 4px 8px 5px rgba(0,0,0,0.2)" }}
                  className="AgentInformation"
                >
                  <Card.Img
                    className="AgentImage"
                    variant="top"
                    src={"https://imgur.com/9ANQ0cX.jpg"}
                  />
                  <Card.Body>
                    <Card.Title>
                      <h3 class="name">
                        {authUser.firstName + " " + authUser.lastName}
                      </h3>
                    </Card.Title>
                    <Card.Text>
                      <p class="info">
                        {/* TODO: add field bio */}
                        {authUser.aboutme}
                        {authUser.site}
                      </p>
                    </Card.Text>

                    {(authUser.isAgent) ? (
                      <div
                        className="btn-request"
                      >
                        <Button onClick={e => this.editaccount()}>
                          Edit Profile
                        </Button>
                        <Button onClick={e => this.addhouse()}>
                          Add House
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              </div>

              <div className="Right128 col-sm-9">
                {/* {!this.state.request ? this.renderOpenHouseList() : <Request />} */}
                {this.renderRightSide()}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default withFirebase(Agent);