
import React, {Component} from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../server/Firebase/index';
import { withAuthorization, withEmailVerification } from '../../server/Session/index';

import * as ROLES from '../../constants/roles';
const ClientPage = () => (
  <div>
    <h1>Client Page</h1>
    <p> The Client Page is accessible by every client.</p>
  </div>
);
/*
condtion check for role
 */
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.CLIENT);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(ClientPage);
