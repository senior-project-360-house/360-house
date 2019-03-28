
import React, {Component} from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../server/Firebase/index';
import { withAuthorization, withEmailVerification } from '../../server/Session/index';

import * as ROLES from '../../constants/roles';
const AgentPage = () => (
  <div>
    <h1>Agent Page</h1>
    <p> The Home Page is accessible by every Agent.</p>
  </div>
);
/*
condtion check for role
 */
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.AGENT);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AgentPage);
