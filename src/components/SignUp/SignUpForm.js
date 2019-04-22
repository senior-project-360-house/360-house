import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withFirebase } from "../../server/Firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

import firebase from "firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import "./signup.css";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImageUploader from 'react-images-upload';
import {
  faCamera
} from "@fortawesome/free-solid-svg-icons";


const authUser = JSON.parse(localStorage.getItem("authUser"));

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;

// Use to reset sign up form
const INITIAL_STATE = {
  weburl:"",
  aboutme:"",
  payment:"",
  company:"",
  email: "",
  firstName: "",
  lastName: "",
  passwordOne: "",
  passwordTwo: "",
  officeLocation: "",
  licenseNumber: "",
  phonenumber: "",
  favHouses: [],
  listingHouse: [],
  avatar: "",
  isAdmin: false,
  isClient: "true",
  isAgent: "false",
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.firebase);

    this.state = {
      ...INITIAL_STATE,
      avatarFile: "",
      isUploading: false,
      progress: 0,
      avatar: ""
    };
  }

  onSubmit = event => {
    const {
      weburl,
  aboutme,
  payment,
  company,
      email,
      firstName,
      lastName,
      passwordOne,
      officeLocation,
      licenseNumber,
      phonenumber,
      isAdmin,
      isClient,
      isAgent,
      avatar
    } = this.state;

    const roles = [];
    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    } else if (isAgent) {
      roles.push(ROLES.AGENT);
    } else if (isClient) {
      roles.push(ROLES.CLIENT);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(
        this.state.email,
        this.state.passwordOne
      )
      .then(authUser => {
        // Create a user in Firebase realtime database

        if (isClient === "true") {
          return this.props.firebase.user(authUser.user.uid).set({
            //Set user properties

            email,
            firstName,
            lastName,
            passwordOne,
            phonenumber,
            isClient,
            avatar,
            favHouses: ["null"]

            // roles
          });
        }
        if (isAgent === "true") {
          return this.props.firebase.user(authUser.user.uid).set({
            //Set user properties
            weburl,
            aboutme,
            payment,
            company,
            email,
            firstName,
            lastName,
            passwordOne,
            phonenumber,
            officeLocation,
            licenseNumber,
            listingHouse: ["null"],
            avatar,
            isAgent
            // roles
          });
        }
      })
      .then(() => {
        //Reset INITIAL_STATE and rerout to home after completed register
        this.setState({
          ...INITIAL_STATE
        });
        if(isAgent === "true"){
          this.props.history.push(ROUTES.SIGN_IN);
        }
        else{
          this.props.history.push(ROUTES.SIGN_IN)
        }
      })
      .then(() => {
        //send email verification
        return this.props.firebase.doSendEmailVerification();
      })

      .catch(error => {
        //Check if the new Sign Up email had been use for google social Sign In
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }
        

        this.setState({
          error
        });
      });

    event.preventDefault();
  };

  //Get input from user
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onAgentSubmit = event => {
    this.setState({
      isAgent: "true",
      isClient: "false"
    });
  };
  onClientSubmit = event => {
    this.setState({
      isAgent: "false",
      isClient: "true"
    });
  };
  oncChangeCheckbox = event => {
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

 
  onClick = () => {
    this.props.history.push(ROUTES.SIGN_IN);
  };

// Test
handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
handleProgress = progress => this.setState({ progress });
handleUploadError = error => {
  this.setState({ isUploading: false });
  console.error(error);
};
handleUploadSuccess = filename => {
  this.setState({ avatarFile: filename, progress: 100, isUploading: false });
  firebase
    .storage()
    .ref("images")
    .child(filename)
    .getDownloadURL()
    .then(url => this.setState({ avatar: url }));
    
};



  render() {
    const {
      avatar,
      email,
      firstName,
      lastName,
      passwordOne,
      passwordTwo,
      officeLocation,
      licenseNumber,
      phonenumber,
      weburl,
      aboutme,
      payment,
      company,
      // isAdmin,
      isClient,
      isAgent,
      error
    } = this.state;

    // Verify input from client
    const isInvalidClient =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phonenumber === "";

    // Verify input from agent
    const isInvalidAgent =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      phonenumber === "" ||
      officeLocation === "" ||
      licenseNumber === ""||
      aboutme==="" ||
      company==="";

  
    return (
      <div className="container signUpForm">
        <div className="row justify-content-center">
          <div className="col-lg-3 register-left">
            <Image
              className="imageSJSU"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/SJSU_Seal.svg/1200px-SJSU_Seal.svg.png"
              alt="SJSU Logo"
            />
            <h3>Don't Have An Account!!</h3>
            <p>Quickly Sign Up and get a lot of great deal!</p>
            <p>
              OR
              <br />
              Login To Your Account
            </p>
            <Link to={ROUTES.SIGN_IN}>
              <input
                className="button btn_login"
                type="submit"
                name=""
                value="Login"
              />
            </Link>
          </div>

          <div className="col-lg-9 register-right">
            <Form onSubmit={this.onSubmit}>
              <div>
                <h1 className="register-heading">Sign Up Form</h1>
              </div>

              <div className="row register-form">
                <div className="col-md-12">
                <div className="UpAvatar">
                <Image
                    name="avatar"
                    src={
                        this.state.progress!==100 ? "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png" :
                      // "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png"
                      // {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
                      this.state.avatar
                    
                    }
                    onChange={this.onChange}
                    
                    roundedCircle
                    width="100px"
                    height="100px"
                  />
                  <div id="CameraXXX">
                  <label 
              //  style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}
               >
    <FontAwesomeIcon icon={faCamera}></FontAwesomeIcon>
    <FileUploader
      hidden
      randomizeFilename
      accept="image/*"
      storageRef={this.props.firebase.storageRef()}
      onUploadStart={this.handleUploadStart}
      onUploadError={this.handleUploadError}
      onUploadSuccess={this.handleUploadSuccess}
      onProgress={this.handleProgress}
    />
  </label>
                  </div>
               



                </div>
                
                  
                  <div className="role">
                    <Button
                      className="btbRole"
                      variant="secondary"
                      as="input"
                      type="button"
                      value="Client"
                      onClick={this.onClientSubmit}
                    />
                    <Button
                      className="btbRole"
                      variant="secondary"
                      as="input"
                      type="submit"
                      value="Agent"
                      onClick={this.onAgentSubmit}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      placeholder="First Name *"
                      value={firstName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="lastName"
                      type="text"
                      className="form-control"
                      placeholder="Last Name *"
                      value={lastName}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                  
                  <Form.Control as="textarea" rows="3" name="aboutme"
                      className="form-control"
                      placeholder="About yourself *"
                      value={aboutme}
                      onChange={this.onChange}/>
                    
                  </div>
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={this.onChange}
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="passwordOne"
                      className="form-control"
                      value={passwordOne}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <input
                      name="passwordTwo"
                      className="form-control"
                      value={passwordTwo}
                      onChange={this.onChange}
                      type="password"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group ">
                    <input
                      name="phonenumber"
                      type="tel"
                      className="form-control"
                      value={phonenumber}
                      onChange={this.onChange}
                      placeholder="Phone Number"
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                    <input
                      type="text"
                      name="officeLocation"
                      className="form-control"
                      placeholder="Office Location *"
                      value={officeLocation}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                    <input
                      type="text"
                      name="licenseNumber"
                      className="form-control"
                      placeholder="License Number *"
                      value={licenseNumber}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                    <input
                      type="text"
                      name="weburl"
                      className="form-control"
                      placeholder="Your webpage *"
                      value={weburl}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                    <input
                      type="text"
                      name="company"
                      className="form-control"
                      placeholder="Your Company *"
                      value={company}
                      onChange={this.onChange}
                    />
                  </div>
                  <div
                    className={
                      this.state.isAgent === "true"
                        ? "form-group viisible"
                        : "form-group iinvisible"
                    }
                  >
                    <input
                      type="text"
                      name="payment"
                      className="form-control"
                      placeholder="Your Payment *"
                      value={payment}
                      onChange={this.onChange}
                    />
                  </div>
                 
                </div>
              </div>
              <div className="form-group">
                <button
                  disabled={
                    this.state.isClient==="true" ? isInvalidClient : isInvalidAgent
                  }
                  className="btnRegister"
                  type="submit"
                >
                  Sign Up
                </button>

                {error ? (<p>{error.message}</p>) : null}
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don 't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export { SignUpForm, SignUpLink };
