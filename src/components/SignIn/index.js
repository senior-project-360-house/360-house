import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Footer from '../Footer';
import { SignUpLink } from '../SignUp';
import { PasswordForgotLink} from '../PasswordForget';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignInGoogleForm />
    <SignUpLink />
    <PasswordForgotLink/>
  </div>
);



export default SignInPage;
