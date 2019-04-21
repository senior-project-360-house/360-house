import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../../server/Firebase/index";
import * as ROUTES from "../../constants/routes";

import GoogleButton from "react-google-button";

import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import { PasswordForgotLink } from "../PasswordForget";
import * as SCHEMA from "../../constants/schema";
import './signinform.css';


import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";



const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

const ERROR_CODE_POPUP_REQUEST = "auth/cancelled-popup-request";

const ERROR_MSG_POPUP_REQUEST = `Your browser had PopUp block, please add our website
to the popup block whitelis`;

const USER_INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

/*
Sign In with Google base
*/
class SignInGoogleFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { socialAuthUser: {}, error: null };
  }

  /*
  Create a user in Firebase database
  Currently the user gets recreate everytime the user login
  We can use the condition socialAuthUser.additionalUserInfo.isNewUser for
  condition checking
  */
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.setState({ socialAuthUser: socialAuthUser });
        if (socialAuthUser.additionalUserInfo.isNewUser) {
          return this.props.firebase.user(socialAuthUser.user.uid).set({
            /*
          TODO: When finished with all the user field, change to general function [event.target.name]: event.target.value
          */
            displayName: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            isAgent: false,
            phoneNumber: socialAuthUser.user.phoneNumber,
            photoURL: socialAuthUser.user.photoURL
          });
        } else {
          return this.props.firebase.user(socialAuthUser.user.uid);
        }
      })
      .then(() => {
        if (this.state.socialAuthUser.additionalUserInfo.isNewUser) {
          this.setState({ error: null });
          this.props.history.push(ROUTES.GOOGLEADDINFO);
        } else {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
        }
      })
      .catch(error => {
        //Check if the new Google Account had been use for normal sign in
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        } else if (error.code === ERROR_CODE_POPUP_REQUEST) {
          error.message = ERROR_MSG_POPUP_REQUEST;
        }

        this.setState({ error });
      });
    //prevent the page to reload after submit the page
    event.preventDefault();
  };
  render() {
    const { error } = this.state;

    return (
      <div className="logingmail">
        <h2>Or Sign In with</h2>
        <Form onSubmit={this.onSubmit}>
          <GoogleButton
            onClick={this.onSubmit}
            label="Google"
            style={{ width: "17vw" }}
          />
          {/* {error && <p>{error.message}</p>} */}
        </Form>
      </div>
    );
  }
}

/*
  Sign In with Email form base
  */
class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...USER_INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...USER_INITIAL_STATE });
        this.props.history.push(ROUTES.HOMEPAGE);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <div className="SignInForm">
        <div >
          <h1 className="signIn">Sign In</h1>
          <Form name="form" onSubmit={this.onSubmit}>
          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2" className="theLabel">Email: </Form.Label>
            <Col sm="8">
            <Form.Control
              className="theFormControl"
              onChange={this.onChange}
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
            />
          </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2" className="theLabel">Password: </Form.Label>
            <Col sm="8">
            <Form.Control
              className="theFormControl"
              onChange={this.onChange}
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
            />
            </Col>
            </Form.Group>
            <Button
              disabled={isInvalid}
              className="theButton"
              id="buttonLogin1"
              variant="primary"
              type="submit"
            >
              <p>Login</p>
            </Button>
            {error && <p className="err" >{error.message}</p>}
          </Form>
        </div>
        <div className="extraOption">
          <PasswordForgotLink />
          <h5>Don't Have an Account></h5>
          <Link to={ROUTES.SIGN_UP}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div>
    );
  }
}
/*
  Sign in Higher-order component for SignInForm
  */
const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

/*
  Sign in Higher-order component for SignInGoogle
  */
const SignInGoogleForm = compose(
  withRouter,
  withFirebase
)(SignInGoogleFormBase);

export { SignInForm, SignInGoogleForm };



{/* <div className="SignInForm">
        <div className="form">
          <h1 className="signIn">Sign In</h1>
          <Form name="form" onSubmit={this.onSubmit}>

            <Form.Label className="theLabel">Email address</Form.Label>
            <Form.Control
              className="theFormControl"
              onChange={this.onChange}
              type="email"
              name="email"
              value={email}
              placeholder="Enter email"
            />
            <Form.Label className="theLabel">Password</Form.Label>
            <Form.Control
              className="theFormControl"
              onChange={this.onChange}
              type="password"
              name="password"
              value={password}
              placeholder="Enter password"
            />

            <Button
              disabled={isInvalid}
              className="theButton"
              id="buttonLogin1"
              variant="primary"
              type="submit"
            >
              <p>Login</p>
            </Button>
            {error && <p className="err" >{error.message}</p>}
          </Form>
        </div>
        <div className="extraOption">
          <PasswordForgotLink />
          <h5>Don't Have an Account></h5>
          <Link to={ROUTES.SIGN_UP}>
            <p>Sign Up</p>
          </Link>
        </div>
      </div> */}
