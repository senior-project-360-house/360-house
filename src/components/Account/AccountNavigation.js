import React from "react";
import {Link} from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const AccountNavigation = () => (
	<ul>
		<li>
			<Link to={ROUTES.ACCOUNT_PROFILE}>Profile</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT_FAVORITE}>Favorite</Link>
		</li>
	</ul>
);

export default AccountNavigation;
