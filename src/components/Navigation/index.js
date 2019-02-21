import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';


import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ authUser }) => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    {/*
      condition to check user roles
    */}
    {authUser.roles.includes(ROLES.CLIENT) && (
    <li>
      <Link to={ROUTES.CLIENT}>My Profile</Link>
    </li>
    )}
    {authUser.roles.includes(ROLES.AGENT) && (
    <li>
      <Link to={ROUTES.AGENT}>My Profile</Link>
    </li>
    )}
    {authUser.roles.includes(ROLES.ADMIN) && (
    <li>
      <Link to={ROUTES.ADMIN}>ADMIN</Link>
    </li>
    )}
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.HOME}>Home</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;
