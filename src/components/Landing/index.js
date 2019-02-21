import React from 'react';
import Footer from '../Footer';
import Header from '../Header/header';
import { Button, Card, Row, Col } from 'react-materialize';


// var Footer = React.Footer;
const Landing = () => (
  <div>
    <div>
  <div className="container-bg">
    <div className="container" id="containerID">
      <div className="row">
        <div className="col-lg-12">
          <div id="content">
            <h1> Let' explore them all </h1>
            <div className="container h-100">
              <div className="d-flex justify-content-center h-100">
                <div className="searchbar">
                  <input className="search_input" type="text" name placeholder="Search by zipcode, bedrooms or anything..." />
                  <a href="#" className="search_icon"><i className="fas fa-search" /></a>
                </div>
              </div>
            </div>
            <h3> Your dream house is waiting... </h3>
            <hr />
            <button className="btn btn-primary-outline clickOn btn-lg">Check this out!</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div className="container" id="extraInfo">
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

          <Footer />
  </div>
        );
        
        export default Landing;
