import React from "react";
import {compose} from "recompose";
import {Route, Redirect} from "react-router-dom";

import {
	withAuthorization,
	withEmailVerification
} from "../../server/Session/index";

import ProfilePage from "./Profile";
import FavoritePage from './Client/Favorite/index';
import AccountNavigation from "./AccountNavigation";

import AddHousePage from './Agent/AddHouse';

import * as ROUTES from "../../constants/routes";
import * as ROLES from '../../constants/roles';

const authUser = JSON.parse(localStorage.getItem("authUser"));

const Account = () => (
	<div>
	<AccountPage />

	</div>
);
const AccountPage = () => (
	<div>
		<AccountNavigation />
		<Route path={ROUTES.ACCOUNT_PROFILE} component={ProfilePage} />
		<Route path={ROUTES.ACCOUNT_CLIENT_FAVORITE} component={FavoritePage} />
		<Route path={ROUTES.ACCOUNT_AGENT_ADDHOUSE} component={AddHousePage} />

	</div>
);
//Authorization condition, move to page that should be access by signed in user
const condition = authUser => !!authUser;
//Export example, follow this example

export default compose(
	withEmailVerification,
	withAuthorization(condition)
)(Account);
