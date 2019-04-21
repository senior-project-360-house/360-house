import React from "react";

// import "bootstrap/dist/css/bootstrap.css";

// import "../../style/homepage.css";
import "./Landing.css";

import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROLES from "../../constants/roles";
//for redirect and routing
import { Redirect, Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router";
import { withFirebase } from "../../server/Firebase/index";
import { Container } from "semantic-ui-react";

class Landing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      videoURL: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4"
    };
  }
  render() {
    return (
      <div className="homepage">
        <div>
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div id="content">
                  <h1> Let' explore them all </h1>
                  <div>
                    <div className="d-flex justify-content-center h-100">
                      <div className="searchbar">
                        <input
                          className="search_input"
                          type="text"
                          name
                          placeholder="Search by zipcode, bedrooms or anything..."
                        />
                        <Link to={ROUTES.OVERVIEW}>
                          <a href="#" className="search_icon">
                            <i className="fas fa-search" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <h3> Your dream house is waiting... </h3>
                  <hr />
                  <button className="btn Minh-primary-outline clickOn btn-lg">
                    <Link to={ROUTES.OVERVIEW}>Check this out!</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div id="extraInfo">
          <div className="row">
            <div className="col-md-3">
              <div className="card-box">
                <div className="card-title">
                  <h2>1,875</h2>
                  <p>Houses on sale</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-box">
                <div className="card-title">
                  <h2>40</h2>
                  <p>Open houses</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-box">
                <div className="card-title">
                  <h2>4000</h2>
                  <p>Recently sold</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-box">
                <div className="card-title">
                  <h2>401</h2>
                  <p>Price reduced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
