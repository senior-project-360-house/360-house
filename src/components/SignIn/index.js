import React from 'react';

import { SignUpLink } from '../SignUp';
import { PasswordForgotLink} from '../PasswordForget';

import {SignInForm, SignInGoogleForm} from './SignInForm';

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
