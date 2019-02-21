import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import {Button,Container,Col, Form,FormGroup,Label,Input,} from 'reactstrap';

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
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            //Set user properties
            username,
            email,
          });
      })
      .then(authUser => {
        //Reset INITIAL_STATE and rerout to home after completed register
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
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
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (



<Container className="SignIn">
        <h2>Sign In</h2>
        <Form className="form" onSubmit={this.onSubmit}>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Email Address</Label>
              <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Confirm Passwor</Label>
               <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
            </FormGroup>
          </Col>
          <Button variant="outline-primary" disabled={isInvalid} type="submit">
          Sign up
        </Button>
        </Form>
{/*         <div>
        <SignUpLink />
      <PasswordForgotLink/>
        </div> */}
        {error && <p>{error.message}</p>}
      </Container>





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
