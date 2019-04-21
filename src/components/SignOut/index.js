import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "reactstrap";
import { Link } from "react-router-dom";
import { withFirebase } from "../../server/Firebase/index";
import * as ROUTES from "../../constants/routes";
const SignOutButton = ({ firebase }) => (
  // <button type="button" onClick={firebase.doSignOut}>
  //   Sign Out
  // </button>
  // {/* <ButtonToolbar >
  //   <ButtonGroup aria-label="Toolbar with button groups">
  //   <Button variant="danger" type="button">
  //     Help
  //   </Button>
  //   </ButtonGroup> */}

  // <ButtonGroup>
  <Link to={ROUTES.LANDING}>
    <Button className="signoutBtn" type="submit" onClick={firebase.doSignOut}>
      Sign Out
    </Button>
  </Link>
);
export default withFirebase(SignOutButton);
