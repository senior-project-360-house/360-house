import React, {Component} from "react";
import {compose} from "recompose";
import {Link} from "react-router-dom";

import {withFirebase} from "../../../server/Firebase";
import {AuthUserContext} from "../../../server/Session";

import {PasswordChangeLink} from "../../PasswordChange";
import LoginManagement from "./LoginManagement";

import * as ROUTES from "../../../constants/routes";

const authUser = JSON.parse(localStorage.getItem("authUser"));
// TODO: Await for user profile
class ProfilePageForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			profile: {
				email: authUser.email,
				displayName: authUser.displayName,
				gender: authUser.gender,
				phoneNumber: authUser.phoneNumber,
				photoURL: authUser.photoURL
			}
		};
	}
	render() {
		return (
			<div>
				{Object.keys(this.state.profile).map((key, value) => (
					<div>
						{key}: {this.state.profile[key]}
					</div>
				))}
				<img alt="nothing to see" src={this.state.profile.photoURL} />
			</div>
		);
	}
}

const ProfilePage = () => (
	<AuthUserContext.Consumer>
		{authUser => (
			<div>
				<h1>Account: {authUser.email}</h1>
				<ul>
					<PasswordChangeLink />
					<LoginManagement authUser={authUser} />
					<ProfilePageForm />
				</ul>
				<hr />
			</div>
		)}
	</AuthUserContext.Consumer>
);

const ProfilePageLink = () => (
	<p>
		<Link to={ROUTES.ACCOUNT_PROFILE}>Profile</Link>
	</p>
);

export {ProfilePageLink};
export default compose(withFirebase)(ProfilePage);
