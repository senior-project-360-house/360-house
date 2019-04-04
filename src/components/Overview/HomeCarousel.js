
import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import ShowMore from 'react-show-more';
import { Collapse, Button} from 'reactstrap';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import {withFirebase} from '../../server/Firebase/index';

class HomeCarousel extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isLoading: false,
      showText: false,
      dis: []
    }
  }
  toggle() {
    this.setState({
      open: !this.state.open
    });
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.firebase.database.ref('houses').on('value', (snapshot) => {
      const furnitures = snapshot.val().house1;
      let newState = [];
      let imgs = furnitures.image;
      for(var x in imgs){
      newState.push(imgs[x]);
      }
      console.log(imgs);
      this.setState({dis: newState});
    });
  }


  render(){
    let images = this.state.dis;
    var count = 0;
    return(
       <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={true} className="z-depth-1">
         <MDBCarouselInner>
          {images.map(data => {
            count++;
            return fillIn(count, data);
          })}
         </MDBCarouselInner>
       </MDBCarousel>
    );
  }
}

function fillIn (count, image){
  return (
    <MDBCarouselItem itemId={count--}>
      <MDBView>
        <img className="d-block w-100" style={{"max-width" : "100%", "max-height" : "100%"}} src={image} alt="First slide" />
        <MDBMask overlay="black-light" />
      </MDBView>
    </MDBCarouselItem>
  );
}
export default withFirebase (HomeCarousel);
