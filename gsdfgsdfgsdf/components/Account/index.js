import React from 'react';
import {compose} from 'recompose';

import { AuthUserContext, withAuthorization, withEmailVerification} from '../Session';
import {PasswordChangeLink} from '../PasswordChange';
import LoginManagement from './LoginManagement';



const AccountPage  = () => (

  <AuthUserContext.Consumer>
  {

    authUser => (
      <div>
      <h1>Account: {authUser.email}</h1>
      <PasswordChangeLink/>
      <LoginManagement authUser={authUser} />
      </div>
    )
  }</AuthUserContext.Consumer>
);

//Authorization condition, move to page that should be access by signed in user
const condition = authUser => !!authUser;
//Export example, follow this example

export default compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPage);
