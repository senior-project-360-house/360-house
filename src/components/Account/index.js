import React from "react";
import {compose} from "recompose";
import {
	Switch,
	Route,
	BrowserRouter as Router,
	Redirect
} from "react-router-dom";

import {
	AuthUserContext,
	withAuthorization,
	withEmailVerification
} from "../../server/Session/index";

import ProfilePage, {ProfilePageLink} from "./Profile";
import FavoritePage from "./Favorite";
import AccountNavigation from "./AccountNavigation";

import * as ROUTES from "../../constants/routes";

const Account = () => (
	<div>
		<AccountPage />
		<Redirect to={ROUTES.ACCOUNT_PROFILE} />
	</div>
);
const AccountPage = () => (
	<div>
		<AccountNavigation />
		<Route path={ROUTES.ACCOUNT_PROFILE} component={ProfilePage} />
		<Route path={ROUTES.ACCOUNT_FAVORITE} component={FavoritePage} />
	</div>
);
//Authorization condition, move to page that should be access by signed in user
const condition = authUser => !!authUser;
//Export example, follow this example

export default compose(
	withEmailVerification,
	withAuthorization(condition)
)(Account);
