import React, { Component } from "react";

import * as ROUTES from "../../constants/routes";

import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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

let path;
let remember;

let lastInfor;
let imagesource = false;

class AboutAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      isLoading: false,
      dis: [],
      agent: [],
    };
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

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.database.ref("account").on("value", snapshot => {
      const data = snapshot.val().agentAccount;
      let newState = [];
      let imgs = data.agentAccount1;

      this.setState({ agent: imgs, isLoading: false });
    });
    this.props.firebase.database.ref("houses").on("value", snapshot => {
      let h = [];
      let authUser = this.state.agent;
      for(var obj in this.state.agent.listingHouse){
        if(authUser.listingHouse[obj] !== "null"){
          let idTemp = authUser.listingHouse[obj].id;
          h.push({
            id: idTemp,
            imageX: snapshot.val()[idTemp].images["0"],
            address: snapshot.val()[idTemp].propertyInfor.details.address,
            price: snapshot.val()[idTemp].propertyInfor.details.listPrice
          });
          imagesource = true;
        }
      }
      this.setState({ houses: h, isLoading: false });
    });
  }

  renderOpenHouseList() {
    const renderListHouse = this.state.houses.map(house => {
      return this.formBuild(house);
    });
    return <div>{renderListHouse}</div>;
  }

  printEmpty(){
    return(
      <p>You have no favorite house!</p>
    );
  }



  formBuild(aHouses) {
    return (
      <div className="XXcol-1-2-128">
      <Link to={ROUTES.OVERVIEW}>
        <div className="HouseInfo128">

          <Image src={aHouses.imageX} alt="" />
          <h2>
            Price: {aHouses.price}
            <br />
            {aHouses.address}
          </h2>

        </div>
        </Link>
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
              {/* <Nav.Item>
                <Nav.Link>
                  <span
                    id="nav128_01"
                    className="textNav"
                  >
                    <Link to={ROUTES.OVERVIEW}>BACK</Link>
                  </span>
                </Nav.Link>
              </Nav.Item> */}
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
                        {this.state.agent.firstName + " " + this.state.agent.lastName}
                      </h3>
                    </Card.Title>
                    <Card.Text>
                      <p class="info">
                        {/* TODO: add field bio */}
                        {this.state.agent.aboutme}
                        {this.state.agent.company}
                      </p>
                    </Card.Text>


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
export default withFirebase(AboutAgent);
