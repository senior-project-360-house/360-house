import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
// import Footer from '../Footer';
import { SignUpLink } from "../SignUp";
import { PasswordForgotLink } from "../PasswordForget";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { SignInForm, SignInGoogleForm } from "./SignInForm";

const SignInPage = () => (
  <div>
    <SignInForm />
    <SignInGoogleForm />
    <SignUpLink />
    <PasswordForgotLink />
  </div>
);

export default SignInPage;

// export { SignInForm };
