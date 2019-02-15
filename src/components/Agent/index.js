
import React, {Component} from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

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

export default withAuthorization(condition)(AgentPage);
