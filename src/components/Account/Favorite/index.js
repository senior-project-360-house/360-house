import React from "react";
import {Link} from "react-router-dom";

import * as ROUTES from "../../../constants/routes";

const FavoritePage = () => <div>Favorite Page</div>;

const FavoritePageLink = () => (
	<div>
		<Link> to={ROUTES.ACCOUNT_FAVORITE}>Favorite</Link>
	</div>
);

export {FavoritePageLink};
export default FavoritePage;
