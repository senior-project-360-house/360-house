import React, { Component } from "react";
import { withFirebase } from "../../server/Firebase/index";
// var Modal = require('react-bootstrap-modal');
import Modal from "react-responsive-modal";
import { Redirect, Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router";

import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Form from "react-bootstrap/Form";
import Label from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Input from "./formcomponents/Input";

import "./style.css";
let path;
let remember;
const authUser = JSON.parse(localStorage.getItem("authUser"));

class AgentEditAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        aboutme: "",
        avatar: "",
        company: "",
        email: "",
        firstName: "",
        isAgent: "",
        lastName: "",
        licenseNumber: "",
        listingHouse: [],
        officeLocation: "",
        passwordOne: "",
        payment: "",
        phonenumber: "",
        weburl: ""
      },

    };

    this.handleFirstName = this.handleFirstName.bind(this);
    this.handleLastName = this.handleLastName.bind(this);
    this.handleCompany = this.handleCompany.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handlebio = this.handlebio.bind(this);
    this.handleOfficeLocation = this.handleOfficeLocation.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.handleAvater = this.handleAvater.bind(this);

    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
     this.handleFormSubmit = this.handleFormSubmit.bind(this);

    console.log(authUser);


}



handleFirstName(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, firstName: value
       }
 }))
 }

 handleLastName(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, lastName: value
       }
     }))
 }

 handleCompany(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, company: value
       }
     }))
 }

 handlePhone(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, phonenumber: value
       }
     }))
 }

 handlebio(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, aboutme: value
       }
     }))
 }

 handleOfficeLocation(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, officeLocation: value
       }
     }))
 }

 handlePayment(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, payment: value
       }
     }))
 }

 handleAvater(e) {
  let value = e.target.value;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, avatar: value
       }
     }))
 }



 handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
  this.setState( prevState => ({ newUser :
       {...prevState.newUser, [name]: value
       }
     }))
 }



 handleClearForm(e) {

     e.preventDefault();
     this.setState({
       newUser: {
         aboutme: authUser.aboutme,
         avatar: authUser.avatar,
         company: authUser.company,
         firstName: authUser.firstName,
         lastName: authUser.lastName,
         officeLocation: authUser.officeLocation,
         payment: authUser.payment,
         phonenumber: authUser.phonenumber,
       },
     })
 }

 handleFormSubmit(e) {
   e.preventDefault();
   let userData = this.state.newUser;
   this.props.firebase.doUpdateProfile(userData);
 }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };



  componentDidMount() {
    let newState = [];
    newState.push({
      aboutme: authUser.aboutme,
      avatar: authUser.avatar,
      company: authUser.company,
      firstName: authUser.firstName,
      lastName: authUser.lastName,
      officeLocation: authUser.officeLocation,
      payment: authUser.payment,
      phonenumber: authUser.phonenumber
              });
    this.setState({newUser: newState});
  }



  render() {
    return (
      <div className="AgentEditAccount">
      <h3 className="HeaderEditAgent"> Edit your account information</h3>
      <Row>
      <Col sm={4} className="LeftSideEdit">
      {/* <div /> */}
      {/* <h3>Edit Your Avatar</h3> */}
      <div className="CanhMid">
      <Image
      src="//placehold.it/100"
      className="AvatarEdit"
      roundedCircle
      alt="avatar"
      />
      <h3>Upload a different photo</h3>

      <input type="file" className="ChoiceFileAvatar" />
      </div>
      </Col>

      <Col sm={8} className="RightSideEdit">
      <div>
      <Form onSubmit={this.handleFormSubmit}>
      <div className="EditFormAgnet">
      <span className="PreEditName">First name: </span>
      <br />
      <Input
      name="firstname"
      type="text"
      className="Agentform-control"
      value={this.state.newUser[0]?this.state.newUser[0].firstName:null}
      placeholder = {'Enter your first name'}
      handleChange = {this.handleInput}
      />
      <br />
      <span className="PreEditName">Last name: </span>
      <br />
      <Input
      name="lastname"
      type="text"
      className="Agentform-control"
      value={this.state.newUser[0]?this.state.newUser[0].lastName:null}
      placeholder = {'Enter your last name'}
      handleChange = {this.handleInput}
      />
      <br />
      <span className="PreEditName">Company: </span>
      <br />
      <Input
      name="company"
      type="text"
      className="Agentform-control"
      value={this.state.newUser[0]?this.state.newUser[0].company:null}
      placeholder = {'Enter your company'}
      handleChange = {this.handleInput}
      />
      <br />
      <span className="PreEditName">Office Location: </span>
      <br />
      <Input
      name="payment"
      type="text"
      className="Agentform-control"
      value={this.state.newUser[0]?this.state.newUser[0].officeLocation:null}
      placeholder = {'Enter your office address'}
      handleChange = {this.handleInput}
      />

      <br />
      <span className="PreEditName">Bio: </span>
      <br />
        {/* Bio/ personal statement of an agent/ large text input  */}

      <textarea rows="5" cols = "60"
      name="bio"
      type="text"
      className="Agentform-control"
      placeholder={"Enter your personal statement. How would you want to address yourself to your clients ?"}
      value={this.state.newUser[0]?this.state.newUser[0].aboutme:null}
      handleChange = {this.handleInput}
      />

      <br />



      <span className="PreEditName">Your membership: </span>
      <br />
      <Input
      name="membership"
      type="text"
      className="Agentform-control"
      placeholder={"your membership until xxx"}
      value={this.state.newUser[0]?this.state.newUser[0].membership:null}
      handleChange = {this.handleInput}
      />

      </div>
      </Form>
      </div>
      </Col>
      </Row>
      <divd className="ButtonEditClient">
      <ButtonToolbar className="justify-content-center">
      <Button

        variant="primary"
        onClick={this.handleFormSubmit}

      >
        Save Changes
      </Button>
      <Button
        variant="secondary"
        onClick = {this.handleClearForm}>Edit Infor
      </Button>
      <Link to={ROUTES.PAYMENT}><Button variant="info">Update Payment Method</Button></Link>
      </ButtonToolbar>
      </divd>
      </div>
      );
    }
  }
  export default withFirebase(AgentEditAccount);
