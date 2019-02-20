import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';
const ERROR_MSG_ACCOUNT_EXISTS = `
An account with this E-Mail address already exists.
Try to login with this account instead. If you think the
account is already used from one of the social logins, try
to sign-in with one of them. Afterward, associate your accounts
on your personal account page.
`;

const SignUpPage = () => (
  <div>
  <h1>SignUp</h1>
  <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  isClient: false,
  isAgent: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin, isAgent, isClient } = this.state;

    const roles = [];

    if(isAdmin) {
      roles.push(ROLES.ADMIN);
    }else if (isAgent){
      roles.push(ROLES.AGENT);
    }else if (isClient){
      roles.push(ROLES.CLIENT);
    }

    this.props.firebase
    .doCreateUserWithEmailAndPassword(email, passwordOne)
    .then(authUser => {
      // Create a user in Firebase realtime database
      return this.props.firebase.user(authUser.user.uid)
      .set({
        //Set user properties
        username,
        email,
        roles,
      });
    })
    .then(()=>{
      //send email verification
      return this.props.firebase.doSendEmailVerification();
    })
    .then(() => {
      //Reset INITIAL_STATE and rerout to home after completed register
      this.setState({ ...INITIAL_STATE });
      this.props.history.push(ROUTES.HOME);
    })
    .catch(error => {
      //Check if the new Sign Up email had been use for google social Sign In
      if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
      }

      this.setState({ error });
    });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  oncChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked});
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      isClient,
      isAgent,
      error,
    } = this.state;

    const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';

    return (
      <form onSubmit={this.onSubmit}>
      <input
      name="username"
      value={username}
      onChange={this.onChange}
      type="text"
      placeholder="Full Name"
      />
      <input
      name="email"
      value={email}
      onChange={this.onChange}
      type="text"
      placeholder="Email Address"
      />
      <input
      name="passwordOne"
      value={passwordOne}
      onChange={this.onChange}
      type="password"
      placeholder="Password"
      />
      <input
      name="passwordTwo"
      value={passwordTwo}
      onChange={this.onChange}
      type="password"
      placeholder="Confirm Password"
      />
      {/*(TODO: Make only one choice Admin,Agent,Client possible at a time)*/}
      <label>
      Admin:
      <input
      name="isAdmin"
      type="checkbox"
      checked={isAdmin}
      onChange={this.oncChangeCheckbox}
      />
      </label>
      <label>
      Agent:
      <input
      name="isAgent"
      type="checkbox"
      checked={isAgent}
      onChange={this.oncChangeCheckbox}
      />
      </label>
      <label>
      Client:
      <input
      name="isClient"
      type="checkbox"
      checked={isClient}
      onChange={this.oncChangeCheckbox}
      />
      </label>
      <button disabled={isInvalid} type="submit">
      Sign Up
      </button>

      {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
  Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
