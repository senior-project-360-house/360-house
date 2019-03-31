import React, {Component} from "react";

import {Switch, Route} from 'react-router-dom';
import {AuthUserContext} from '../../server/Session';

import AddHousePage from "./AddHouse";
import {HousesList} from "./HousesList";
import HouseItemPage from "./HouseItemPage";

import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

const House = () => (
	<div>
		{/**
		 * User AuthUserContext to check for Log In, if not login or role is a client
		 * show HousePage that only have list of House
		 *
		 * If User is an ADMIN or AGENT, also show AddHousePage
		 */}
		<h1>House Page</h1>

		<Switch>
			{/*
            Routes with HOUSE_DETAILS : /house/:id to this switch
            that Link to new route.
             */}

			<Route exact path={ROUTES.HOUSE_DETAILS} component={HouseItemPage} />
			<Route exact path={ROUTES.HOUSE} component={HousePage} />
		</Switch>
	</div>
);

const HousePage = () => (
	<AuthUserContext.Consumer>
		{authUser =>
			authUser ? <AgentHousePage authUser={authUser} /> : <UserPage />
		}
	</AuthUserContext.Consumer>
);

const AgentHousePage = ({authUser}) => (
	<ul>
		<HousesList />

		{authUser.roles.includes(ROLES.ADMIN) && <AddHousePage />}
		{authUser.roles.includes(ROLES.AGENT) && <AddHousePage />}
	</ul>
);

const UserPage = () => (
	<ul>
		<HousesList />
	</ul>
);

export {AddHousePage, HousesList, HousePage};
export default House;
