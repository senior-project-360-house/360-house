
import React,{Component} from 'react';
import {compose} from 'recompose';

import {HousesList,AddHousePage} from '../House';

import {AuthUserContext} from '../Session';

import * as ROLES from '../../constants/roles';


const Home = () => (

  <div>
    <h1>Home Page</h1>
    <p> The Home Page is accessible by every user.</p>
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

