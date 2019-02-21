import React,{Component} from 'react';
import {compose} from 'recompose';

import {HousesList,AddHousePage} from '../House';

import {AuthUserContext} from '../Session';

import * as ROLES from '../../constants/roles';


const Home = () => (
  <div>
    <h1>Home Page</h1>
    <p> The Home Page is accessible by every user.</p>
    {/**
     * User AuthUserContext to check for Log In, if not login or role is a client
     * show HomePage that only have list of House
     *
     * If User is an ADMIN or AGENT, also show AddHousePage
     */}
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <AgentHomePage authUser={authUser} /> : <HomePage/>
      }
    </AuthUserContext.Consumer>

  </div>
);

const AgentHomePage = ({authUser}) => (
  <ul>
    <HousesList/>
    {authUser.roles.includes(ROLES.ADMIN) && (
      <AddHousePage/>
    )}
    {authUser.roles.includes(ROLES.AGENT) && (
      <AddHousePage/>
    )}
  </ul>
)

const HomePage = () => (
  <ul>
    <HousesList/>
  </ul>
)

export default Home;
