import React, { Component } from 'react';
import { Redirect, Router, Route } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { withRouter } from 'react-router';
import {withFirebase} from '../../server/Firebase/index';
import { AuthUserContext } from "../../server/Session/index";
//import for individual card
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import {Container} from 'react-bootstrap';
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
//for button
import {ButtonGroup} from 'reactstrap';
import Navbar from '../Client/NavBar';
import { Link } from "react-router-dom";

//css for client
import './houselist.css'
// import './style.css'

let path;
let remember;
let imagesource = false;
const authUser = JSON.parse(localStorage.getItem("authUser"));

class HouseList extends React.Component {
  constructor(props) {
    super(props);
    let path = this.props.history;
    console.log(path);
    this.state = {
      isLoading: false,
      dis: [],
      authUser: {},
      houses: path.location.state,
      pathname: path
    };
    this.toOverView = this.toOverView.bind(this);
  }

  deleteAction() {
    var userRef = this.props.firebase.database.ref('users/' + authUser.uid);
    userRef.child('favHouses').update({hs: null});
  }

  toOverView(){
    this.state.pathname.push({pathname:ROUTES.OVERVIEW});
  }

  componentDidMount() {
    this.setState({isLoading: true});
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    this.props.firebase.database.ref('account').on('value', (snapshot) => {
      const data = snapshot.val().userAccount;
      let newState = [];
      let imgs = data.userAccount1;
      console.log(imgs.passWord);
      newState.push({
                name: imgs.name,
                email: imgs.email,
                img: imgs.img,
                isAgent: imgs.isAgent,
                passWord: imgs.passWord
                });
      this.setState({dis: newState , authUser: authUser,isLoading: false});
    });

  }
  buildHouse(house){
    return(
      <div className="single-house">
        <div className="SingleHouseInfo">
          <Image src={house.img} alt="" />
          <h2> Price: {house.price}
          <br />
          {house.address}
          </h2>
        </div>
        <div style={this.state.hide ? {visibility: "hidden"}: {visibility: "visible"} }
        className="clientbutton">
        <Button variant="primary" onClick = {this.toOverView}>Visit</Button>
      </div>
    </div>
    );
  }


buildFavoriteHouseList(){
  const Panel = this.state.houses.map(house=>{
    return this.buildHouse(house)
  });
  return <div>{Panel}</div>;
}

buildFavoriteHouseList2(){
    const Panel = this.state.demo.map(house=>{
      return this.buildHouse(house)
    });
    return <div>{Panel}</div>;
  }

  render() {
    const {isLoading, authUser} = this.state;
    const size = Object.keys(this.state.houses).length;
    remember = this.state.dis;

    return (
      <div className="clientContent">
      <h1> Your search result</h1>
      {(size===0) ? (
        <div>
        <h1> Uh Oh...
            <br/>
        </h1>
        <Container>
        <div className="suggestion">
        <h3>There is no search result for your query.</h3>
        <h3>You can try the below suggestions</h3>
        <div class="list-type5">
        <ol>
        <li><p>Search by Zipcode ? </p></li>
        <li><p>Search by street address ? </p></li>
        <li><p>Search by city ? </p></li>
        </ol>
        </div>
        <Link to={ROUTES.HOMEPAGE}>Go Back</Link>
        </div>
        </Container>
        </div>
        )
          :
      (
        <div>
        <h3> Visit any of these by clicking on the thumbnails. Enjoy !</h3>
        <div>
        <div className="row">
        <div className="FavoriteHouseColumn col-sm-12">
        {this.buildFavoriteHouseList()}
        {/* <p>Hello</p> */}
        </div>
        </div>
        </div>

        </div>
      )
       }
      </div>
    );
  }




}

const imageTag={
  render(){
    return(
      <p>me</p>
    )
  }

};

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    objectFit: 'cover',
  },
};


export default  withFirebase(HouseList);





// houses: [
//     {
//       img: "https://i.imgur.com/GqgkPSx.jpg",
//       address: "1234 Tully Road San Jose CA,",
//       price: "$300,000"
//     },
//     {
//       img: "https://i.imgur.com/R95ADE9.jpg",
//       address: "2138 ShadowBone San Jose",
//       price: "$1,300,000"
//     },
//     {
//       img: "https://i.imgur.com/uhBRgH9.jpg",
//       address: "9216 Aborn San Jose",
//       price: "$1,500,000"
//     },
//     {
//       img: "https://i.imgur.com/0GvHsB5.jpg",
//       address: "3637 Snell Avenue SPC364",
//       price: "$300,000"
//     }
//     ]
