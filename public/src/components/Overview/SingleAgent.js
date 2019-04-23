import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../server/Firebase/index";
import RequestView from "../Request/Buyer/BuyerRequest";
import { withRouter } from "react-router";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";

let path;
let remember;
class SingleAgent extends Component {
  constructor(props) {
    super(props);
    path = this.props.history;
    console.log(path);
    this.state = {
      isLoading: false,
      showText: false,
      dis: [],
      email: "",
      user: {},
      agent: []
    };
  }
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.setState({ isLoading: true });

    const user = JSON.parse(localStorage.getItem('authUser'));

    this.props.firebase.database.ref("houses").on("value", snapshot => {
      const data = snapshot.val().house1;
      let newState = [];
      let imgs = data.agent;
      newState.push({
        email: imgs.email,
        name: imgs.name,
        img: imgs.profilePicture,
        phone: imgs.phone
      });
      this.setState({ dis: newState, email: newState[0].email, user: user, agent: imgs});    });
  }

  render() {
    // const { open } = this.state;
    // let images = this.state.dis;
    // var count = 0;
    const {emai, user} = this.state;
    return (
      <div className="AgentInfor">
        <Card>
          <Card.Img variant="top" src="https://imgur.com/9ANQ0cX.jpg" />
          <Card.Body>
            <Card.Title>
              {this.state.dis[0] ? this.state.dis[0].name : ""}
            </Card.Title>
            <Card.Text>
              <FontAwesomeIcon icon={faPhone} className="fa" />
              {this.state.dis[0] ? this.state.dis[0].phone : ""}
              <p />
              <FontAwesomeIcon icon={faEnvelope} className="fa" />
              {this.state.dis[0] ? this.state.dis[0].email : ""}
            </Card.Text>
            <div className="btn-requestOverview">
              <ButtonToolbar className="btn-toolbarOverview">
              <Link to={ROUTES.ABOUTAGENT}>
                  <Button variant="primary">About</Button>
              </Link>

                <RequestView
                  house={
                    {id: "house1"}
                  }
                  buyer={{
                    id: user.uid,
                    email: user.email
                  }}
                  agent={{
                    id: "yRGHR5R84YZ0IWp9N7dWIkINsVv2",
                    email: this.state.email
                  }}
                />
              </ButtonToolbar>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default withFirebase(SingleAgent);
