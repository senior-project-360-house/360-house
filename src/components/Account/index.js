import React from 'react';

import { AuthUserContext, withAuthorization} from '../Session';
import {PasswordChangeLink} from '../PasswordChange';

const AccountPage  = () => (

  <AuthUserContext.Consumer>
  {

    authUser => (
      <div>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeLink/>
      </div>
    )
  }</AuthUserContext.Consumer>
);

//Authorization condition, move to page that should be access by signed in user
const condition = authUser => !!authUser;
//Export example, follow this example

export default withAuthorization(condition)(AccountPage);
