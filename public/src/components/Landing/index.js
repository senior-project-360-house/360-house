import React from "react";
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
import { HeroVideo } from "react-hero-video";

let path;
let match = [];
class Landing extends React.Component {
  constructor(props) {
      super(props);
      path = this.props.history;
      this.state = {
        videoURL: "http://clips.vorwaerts-gmbh.de/VfE_html5.mp4",
        address: "",
        houses: [],
        matches: []
      };
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
    }

  onSubmit(){
    match= [];
    let housesSearch = this.state.houses;
    var input = this.state.address;
    console.log(input);

    for(var h in housesSearch){
      if(housesSearch[h].val.propertyInfor.details.address.includes(input) && input !== ''){
        match.push({
          id:housesSearch[h].id, img: housesSearch[h].val.images["0"], price: housesSearch[h].val.propertyInfor.details.listPrice, address: housesSearch[h].val.propertyInfor.details.address});
      }
    }
    this.setState({matches: match});

    path.push({
      pathname: ROUTES.SEARCH
    },match);
  }
  handleAddressChange(e){
    this.setState({address: e.target.value});
 }

 componentDidMount(){
   const temp = this.props.firebase.database.ref('houses');
   temp.on('value', (snapshot) => {
     let hs = snapshot.val();
     let house = [];

   for(var h in hs){
       house.push({id: h, val:hs[h]});
   }
   this.setState({
       houses: house
     });
  });
 }



  render() {
    return (
      <div className="homepage">
        <div>
          <div>
            <div className="row">
              <div className="col-lg-12">
                <div id="content">
                  <h1> Find your dream house </h1>
                  <div>
                  <div className="d-flex justify-content-center h-100">
                  <div className="wrap">
                      <form className="search">
                      <input
                        type="text"
                        name="address"
                        class="searchTerm"
                        value={this.state.address}
                        onChange={this.handleAddressChange}
                        placeholder="Search by zipcode, street address or..."
                      />
                      <button onClick={this.onSubmit} type="submit" class="searchButton">
                      <i class="fa fa-search"></i>
                      </button>
                      {/* <a href="#" onClick={this.onSubmit} className="search_icon">
                            <i className="fas fa-search" />
                          </a> */}
                     </form>
                     </div>

                  </div>
                  </div>

                  <hr />
                  <Link to={ROUTES.OVERVIEW}>
                  <button className="btn Minh-primary-outline clickOn btn-lg">
                    Check this out!
                  </button>
                  </Link>
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

export default withFirebase(Landing);
