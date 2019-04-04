import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import ShowMore from 'react-show-more';
import { Collapse, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import './carousel.css'
import { Card, Icon, Image } from 'semantic-ui-react'
import {withFirebase} from '../../server/Firebase/index';
import Popup from 'reactjs-popup';
// import ModalExample from './Modal';
import 'bootstrap/dist/css/bootstrap.css';
import Modal from "react-responsive-modal";
import Button from "react-bootstrap/Button";
import './Modal.css'
import { Redirect, Router, Route } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { withRouter } from 'react-router';




class SingleAgent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      isLoading: false,
      showText: false,
      dis: []
    };
  }


  state = {
    open: false
  };
  onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };



  componentDidMount() {
    this.setState({isLoading: true});
    this.props.firebase.database.ref('houses').on('value', (snapshot) => {
      const data = snapshot.val().house1;
      let newState = [];
      let imgs = data.agent;
      newState.push({
                 email: imgs.email,
                 name: imgs.name,
                 img: imgs.profilePicture,
                 phone: imgs.phone
                 });
      this.setState({dis: newState});
    });
  }


  render(){
    const { open } = this.state;
    let images = this.state.dis;
    var count = 0;
    return(
      <div>


  <Card>
  <Image src={this.state.dis[0]?this.state.dis[0].img:null} style={{"width": "100%", "display": "flex", "margin": "auto"}} />
  <Card.Content>
    <center><strong>{this.state.dis[0]?this.state.dis[0].name:null}</strong></center>
    <Card.Meta>
      <a><p style={{'fontSize': '13px'}}><Icon name='phone' />   <strong>{this.state.dis[0]?this.state.dis[0].phone:null}</strong></p></a>
    </Card.Meta>
    <Card.Meta>
      <a><p style={{'fontSize': '10px'}}><Icon name='mail' style={{'fontSize': '13px'}} />   <strong>{this.state.dis[0]?this.state.dis[0].email:null}</strong></p></a>
    </Card.Meta>
  </Card.Content>
</Card>
</div>
    );
  }
}
//<center><button onClick={this.toggle}>Contact Me</button></center>
function fillIn (count, image){
  return (
    <MDBCarouselItem itemId={count--}>
      <MDBView>
        <img className="d-block w-100" src={image} alt="First slide" />
        <MDBMask overlay="black-light" />
      </MDBView>
    </MDBCarouselItem>
  );
}


export default withFirebase (SingleAgent);
