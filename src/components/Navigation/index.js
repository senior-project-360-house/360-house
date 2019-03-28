import React from "react";
import {Link} from "react-router-dom";

import SignOutButton from "../SignOut";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import {AuthUserContext} from "../../server/Session/index";

const Navigation = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser =>
				authUser ? (
					<NavigationAuth authUser={authUser} />
				) : (
					<NavigationNonAuth />
				)
			}
		</AuthUserContext.Consumer>
	</div>
);

const NavigationAuth = ({authUser}) => (
	<ul>
		<li>
			<Link to={ROUTES.LANDING}>Landing</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT}>Account</Link>
		</li>
		<li>
			<Link to={ROUTES.HOME}>Home</Link>
		</li>
		<li>
			<Link to={ROUTES.HOUSE}>House</Link>
		</li>
		{/*
      condition to check user roles
    */}
		{authUser.roles.includes(ROLES.CLIENT) && (
			<li>
				<Link to={ROUTES.CLIENT}>My Profile</Link>
			</li>
		)}
		{authUser.roles.includes(ROLES.AGENT) && (
			<li>
				<Link to={ROUTES.AGENT}>My Profile</Link>
			</li>
		)}
		{authUser.roles.includes(ROLES.ADMIN) && (
			<li>
				<Link to={ROUTES.ADMIN}>ADMIN</Link>
			</li>
		)}
		<li>
			<SignOutButton />
		</li>
	</ul>
);

const NavigationNonAuth = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
		<a className="navbar-brand" href="#">
			Team LOGO
		</a>
		<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>
		<div className="collapse navbar-collapse" id="navbarText">
			<ul className="navbar-nav mr-auto" />
			<ul className="navbar-nav justify-content-end">
				<li className="nav-item">
					<a className="nav-link" href="#">
						<Link to={ROUTES.SIGN_IN}>Sign In</Link>
					</a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">
						<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
					</a>
				</li>
			</ul>
		</div>
	</nav>
);

export default Navigation;
