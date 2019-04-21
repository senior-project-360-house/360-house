import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import { withFirebase } from "../../server/Firebase/index";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";

import { AuthUserContext } from "../../server/Session/index";
import "./style.css";
const route = value => {
  if (value) {
    return (
      <Link id="ProfileWord1" to={ROUTES.CLIENT}>
        My Profile
      </Link>
    );
  } else {
    return (
      <Link id="ProfileWord2" to={ROUTES.AGENTPROFILE}>
        My Profile
      </Link>
    );
  }
};

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

const NavigationAuth = ({ firebase, authUser }) => (
  <Navbar
    expand="sm"
    // bg="dark"
    variant="dark"
    className="justify-content-center Navigation"
    collapseOnSelect
    expand="sm"
    fixed="top"
    sticky="top"
  >
    <Navbar.Brand href={ROUTES.HOMEPAGE}>
      <Link to={ROUTES.HOMEPAGE}>
        <Image
          onClick={ROUTES.HOMEPAGE}
          swidth={100}
          height={100}
          src={"/images/logo2.png"}
          // window.location.origin +
        />
      </Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse className="leftSideNav">
      <Nav className="nav-item">
        <Nav.Item>
          <Link to={ROUTES.HOMEPAGE}>Home Page</Link>
        </Nav.Item>
        {/* {authUser.isAgent === "true" ? (
          <div>
            <Nav.Item>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to={ROUTES.HOUSE}>House</Link>
            </Nav.Item>
          </div>
        ) : (
          ""
        )} */}
        <Nav.Item>{route(authUser.isClient === "true")}</Nav.Item>
        <Nav.Item>
          <SignOutButton className="SignOutButton" />
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>

  /*


  <Nav className="NavigateX" activeKey="/Landing">
    <Nav.Item>
      <Link to={ROUTES.LANDING}>Home Page</Link>
    </Nav.Item>

    {authUser.isClient === "true" ? (
      ""
    ) : (
      <div>
        <Nav.Item>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to={ROUTES.HOUSE}>House</Link>
        </Nav.Item>
      </div>
    )}

    <Nav.Item>{route(authUser.isClient === "true")}</Nav.Item>
    <Nav.Item>
      <SignOutButton className="SignOutButton" />
    </Nav.Item>
  </Nav>

  */
);

const NavigationNonAuth = () => (
  <Navbar
    expand="sm"
    // bg="dark"
    variant="dark"
    className="justify-content-center Navigation"
    collapseOnSelect
    expand="sm"
    fixed="top"
    sticky="top"
  >
    <Navbar.Brand href={ROUTES.LANDING}>
      <Link to={ROUTES.LANDING}>
        <Image
          onClick={ROUTES.LANDING}
          swidth={100}
          height={100}
          src={"/images/logo2.png"}
          // window.location.origin +
        />
      </Link>
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

    <Navbar.Collapse className="leftSideNav">
      <Nav className="nav-item">
        <Nav.Item className="textNavx">
          <Nav.Link href={ROUTES.SIGN_IN}>
            <span>{"Sign In"}</span>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="textNavx">
          <Nav.Link href={ROUTES.SIGN_UP}>
            <span>{"Sign Up"}</span>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
