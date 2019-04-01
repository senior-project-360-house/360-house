import React from "react";
import {Link} from "react-router-dom";

import {AuthUserContext} from '../../server/Session';

import * as ROUTES from "../../constants/routes";

const AccountNavigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser =>
				//Check for User roles
				authUser ? <AccountNavigationAgent authUser={authUser} /> : <AccountNavigationClient />
			}
		</AuthUserContext.Consumer>
	</div>
);

const AccountNavigationAgent = () => (
	<ul>
		<li>
			<Link to={ROUTES.ACCOUNT_PROFILE}>Profile</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT_AGENT_ADDHOUSE}>Add House</Link>
		</li>
	</ul>
);

const AccountNavigationClient = () => (
	<ul>
		<li>
			<Link to={ROUTES.ACCOUNT_PROFILE}>Profile</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT_CLIENT_FAVORITE}>Favorite</Link>
		</li>
	</ul>
);

export default AccountNavigation;
