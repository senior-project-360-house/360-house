import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

import * as SCHEMA from '../../constants/schema';

const ERROR_CODE_ACCOUNT_EXISTS =
'auth/account-exists-with-different-credential';


const ERROR_MSG_ACCOUNT_EXISTS = `
An account with an E-Mail address to
this social account already exists. Try to login from
this account instead and associate your social accounts on
your personal account page.
`;

const ERROR_CODE_POPUP_REQUEST =
'auth/cancelled-popup-request';


const ERROR_MSG_POPUP_REQUEST =
`Your browser had PopUp block, please add our website
to the popup block whitelis`;


const USER_INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


/*
Sign In with Google base
*/
class SignInGoogleFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {error : null};
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
      if(socialAuthUser.additionalUserInfo.isNewUser){
        this.setState({error: null});
        this.props.history.push({
          pathname: ROUTES.GOOGLEADDINFO,
          state: {
            displayName : socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            phoneNumber: socialAuthUser.user.phoneNumber,
            photoURL: socialAuthUser.user.photoURL,
          }
        });
      }
      else{
      this.setState({error: null});
      this.props.history.push(ROUTES.HOME);
      }
    })
    .catch(error => {
      //Check if the new Google Account had been use for normal sign in
      if(error.code === ERROR_CODE_ACCOUNT_EXISTS) {
        error.message = ERROR_MSG_ACCOUNT_EXISTS;
      }
      else if(error.code === ERROR_CODE_POPUP_REQUEST) {
        error.message = ERROR_MSG_POPUP_REQUEST;
      }

      this.setState({error});
    });
    //prevent the page to reload after submit the page
    event.preventDefault();
  }
  render() {
    const {error} = this.state;

    return(
      <form onSubmit={this.onSubmit}>
      <button type="submit">Sign In with Google</button>
      {/*
        error checking
        */}
        {error && <p>{error.message}</p>}
        </form>
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
      const { email, password, error } = this.state;

      const isInvalid = password === '' || email === '';

      return (

        <form onSubmit={this.onSubmit}>
        <input
        name="email"
        value={email}
        onChange={this.onChange}
        type="text"
        placeholder="Email Address"
        />
        <input
        name="password"
        value={password}
        onChange={this.onChange}
        type="password"
        placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
        Sign In
        </button>

        {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
  /*
  Sign in Higher-order component for SignInForm
  */
  const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignInFormBase);

  /*
  Sign in Higher-order component for SignInGoogle
  */
  const SignInGoogleForm = compose(
    withRouter,
    withFirebase,
  )(SignInGoogleFormBase)

  export { SignInForm, SignInGoogleForm };
