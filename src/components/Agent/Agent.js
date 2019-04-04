import React, { Component } from 'react';
import Modal from './Agent.css';
import { Redirect, Router, Route } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { withRouter } from 'react-router';

let path;
let remember;

let lastInfor;
class Agent extends Component {

  constructor(props) {
    super(props);
    path = this.props.history;
    lastInfor = this.props.history.location.state;
  }

  onSubmit(){
    path.push({
    pathname: ROUTES.OVERVIEW},
    remember);
  };

  backHome(){
    path.push({
    pathname: ROUTES.LANDING},
    remember);
  };

  render() {
    return (
      <div>
  <div class="row">
    <div class="left col-lg-4">
      <div class="photo-left">
        <img class="photo" src="https://imgur.com/9ANQ0cX.jpg"/>
      </div>
      <h4 class="name">{lastInfor[0].name}</h4>
      <p class="info">Realtor</p>
      <p class="info">{lastInfor[0].site}</p>
      <div class="stats row">
      </div>
      <p class="desc">{lastInfor[0].des}</p>
      <div class="social">
        <i class="fa fa-facebook-square" aria-hidden="true"></i>
        <i class="fa fa-twitter-square" aria-hidden="true"></i>
        <i class="fa fa-pinterest-square" aria-hidden="true"></i>
        <i class="fa fa-tumblr-square" aria-hidden="true"></i>
      </div>
    </div>
    <div class="right col-lg-8">
      <ul class="nav">
        <li>OPEN HOUSES</li>
        <li>FEATURED LISTINGS</li>
        <li onClick={(e) => this.backHome()}>FIND A HOME</li>
      </ul>
      <div class="row gallery">
        <div class="col-md-4">
         <img onClick={(e) => this.onSubmit()} src="https://imgur.com/GqgkPSx.jpg"/>
        </div>
        <div class="col-md-4">
          <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg"/>
        </div>
        <div class="col-md-4">
           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg"/>
        </div>
        <div class="col-md-4">
           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg"/>
        </div>
        <div class="col-md-4">
          <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg"/>
        </div>
        <div class="col-md-4">
          <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg"/>
        </div>
      </div>
    </div>
      </div>
      </div>
    );
  }
}

export default Agent;
