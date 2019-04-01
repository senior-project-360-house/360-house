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
	<Navbar className="navbar" collapseOnSelect expand="lg" fixed="top">
		{/* <Container> */}
		<Navbar.Brand className="text-light" href={ROUTES.HOME}>
			{"TeamLogo"}
		</Navbar.Brand>
		<Navbar.Toggle aria-controls="responsive-navbar-nav" />{" "}
		<Navbar.Collapse className="justify-content-end">
			<Nav className="nav-item">
				<Nav.Item>
					<Nav.Link className="text-light" href={ROUTES.SIGN_IN}>
						<span className="text">{"Sign In"}</span>
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link className="text-light" href={ROUTES.SIGN_UP}>
						<span className="text">{"Sign Up"}</span>
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</Navbar.Collapse>
		{/* </Container> */}
	</Navbar>
);

export default Navigation;
