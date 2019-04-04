import React, { Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ShowMore from 'react-show-more';
import { Collapse, Button} from 'reactstrap';
import {withFirebase} from '../../server/Firebase/index';
import {Link} from "react-router-dom";

import { Redirect, Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as ROUTES from '../../constants/routes';

import SingleHome from "./SingleHome"
import HomeCarousel from "./HomeCarousel"
import SingleAgent from './SingleAgent'
import './carousel.css'
import Render from "../Render"
import MapPage from "../Map"

class NavBars extends React.Component{
  render(){
    return(
      <div>
      <nav className="navbar navbar-expand-lg bg-light justify-content-center">
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
                <Link to={ROUTES.OVERVIEW}>Overview</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to={ROUTES.RENDER}>Render</Link>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <Link to={ROUTES.MAP}>Map</Link>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      </div>
    )
  }
}

export default NavBars;
