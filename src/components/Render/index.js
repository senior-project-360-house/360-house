import {withFirebase} from '../../server/Firebase/index';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "bootstrap/dist/css/bootstrap.css";
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import RBCarousel from "react-bootstrap-carousel";
import { Redirect, Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as ROUTES from '../../constants/routes';
import sced from './utils';
import NavBars from '../Overview/NavBar.js'
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
var room = [];
let path;


class Render extends React.Component {
  constructor(props) {

    super(props);
    path = this.props.history;
    this.state = {
      items: []
    };
  }


  componentDidMount() {
    const itemsRef = this.props.firebase.database.ref('houses');

    itemsRef.on('value', (snapshot) => {

      let hs = snapshot.val();
      let newState = [];

      for (let r in hs.house1.render) {
        let name = r;
          newState.push({
            name: name,
            id: hs.house1.render[r].renderId,
            img: hs.house1.render[r].image
            });
        }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    room = this.state.items;
    var count = 0;
        return (
          <div>
          <NavBars/>
          <MDBContainer>
            <h4 className="mt-5 mb-2">Basic example</h4>
            <MDBCarousel activeItem={1} length={4} showIndicators={true} className="z-depth-1">

              <MDBCarouselInner>
                  {room.map(data => {
                    count++;
                    return leftside(data.img,data.id,data.name,count);
                  })}

            </MDBCarouselInner>

          </MDBCarousel>
        </MDBContainer>
        </div>
        )
      }
}

function leftside (link, id, name,count) {
  return (

        <div>
        <MDBCarouselItem itemId={count}>
        <MDBView>
          <img className="d-block w-100"  src={link} alt="First slide" />
          <MDBMask overlay="black-light" />
        </MDBView>

        <MDBCarouselCaption>
          <h3 className="h3-responsive">{name}</h3>
          <p onClick={(e) => onSubmit(id)}>Explore more</p>
        </MDBCarouselCaption>
        </MDBCarouselItem>
        </div>

  );

}

function onSubmit(id){
  window.sced = id;
  //console.log(path);
  path.push({
  pathname: ROUTES.RENDERROOM});
};


export default withFirebase(Render);
