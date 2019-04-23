
import React, {Component} from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../server/Firebase/index';
import { withAuthorization, withEmailVerification } from '../../server/Session/index';
import {UserList, UserItem} from './UserList';

import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
const AdminPage = () =>(
      <div>
        <h1>Admin</h1>
        <p>
          The Admin Page is accessible by every signed in Admin User.
        </p>
        {/*User to route ADMIN to a specific user detail*/}
        <Switch>
          {
            /*
            Routes with ADMIN_DETAILS : /admin/:id to this switch
            that Link to new route.
             */
          }

          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
      </div>
);



/*
condtion check for role
 */
const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase,
)(AdminPage);
