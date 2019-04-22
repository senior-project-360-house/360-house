import React from "react";
import {Switch, Route} from "react-router-dom";

import * as ROUTES from "../../../constants/routes";

import RequestItem from "./RequestItem";
import RequestList from "./RequestList";

const RequestListPage = props => {
	return (
		<div>
			<h1>Request Page</h1>
			<p>Show all request from buyer</p>
			<Switch>
				<Route exact path={ROUTES.REQUEST_ITEM} component={RequestItem} />
				<Route exact path={ROUTES.REQUEST_LIST} component={RequestList} />
			</Switch>
		</div>
	);
};

export default RequestListPage;
