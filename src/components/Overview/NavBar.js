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
            <Nav.Link href={ROUTES.OVERVIEW}>
              <span id="nav01" className="textNav activeNav">
                {"Overview"}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.TOUR}>
              <span id="nav02" className="textNav">
                {"360 Tour"}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.RENDER}>
              <span id="nav03" className="textNav">
                {"Render"}
              </span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={ROUTES.MAP}>
              <span id="nav04" className="textNav">
                {"Map"}
              </span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    );
  }
}

export default NavBars;
