import React from "react";

import Nav from "react-bootstrap/Nav";

import * as ROUTES from "../../constants/routes";
import "./navbar.css";
class NavBars extends React.Component {
  generatorNameClass(props) {
    return props.isActived === "false" ? "textNav" : "activeNav";
  }
  render() {
    return (
      <div className="container navRender">
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item>
            <Nav.Link href={ROUTES.CLIENT}>
              <span id="nav01" className="textNav activeNav">
                {"Favorite House"}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.CLIENT}>
              <span id="nav02" className="textNav">
                {"Saved Render"}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.LANDING}>
              <span id="nav03" className="textNav">
                {"Render"}
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default NavBars;
