
import React, { Component} from 'react';
import {withFirebase} from '../../server/Firebase/index';
import SingleHome from "./SingleHome"
import HomeCarousel from "./HomeCarousel"
import SingleAgent from './SingleAgent'
import NavBars from './NavBar'
// var Modal = require('react-bootstrap-modal');
import Modal from "react-responsive-modal";
import { Redirect, Router, Route } from 'react-router-dom';
import * as ROUTES from "../../constants/routes";
import { withRouter } from 'react-router';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { Card, Icon, Image } from 'semantic-ui-react'
import Button from "react-bootstrap/Button";
let path;
let remember;
class Overview extends React.Component {
  constructor(props) {
    super(props);
    path = this.props.history;
    this.state = {
      isLoading: false,
      dis: []
    };
  }

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.firebase.database.ref('houses').on('value', (snapshot) => {
      const data = snapshot.val().house1;
      let newState = [];
      let imgs = data.agent;
      newState.push({
                 img: imgs.profilePicture,
                 name: imgs.name,
                 phone: imgs.phone,
                 site: imgs.site,
                 com: imgs.company
                 });
      this.setState({dis: newState});
    });
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

    onSubmit(){
      path.push({
      pathname: '/agentprofile'},remember);
    };



  render(){
    remember = this.state.dis;
    const { open } = this.state;
    return(
      <div>
      <div style={{"padding" : "20px"}}>
        <Row >
        <Col xs={3}>
        <SingleHome />
        </Col>
        <Col xs={8}><HomeCarousel /></Col>
        <Col xs={1} >
        <SingleAgent />
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal style={{overlay: {zIndex: 1000}}} open={open} onClose={this.onCloseModal} top>
        <Table style={{'borderRadius':'5px'}} id="modals">
        <Row>
        <Col> <img src="https://img.icons8.com/ios/50/000000/person-female-filled.png"/> </Col>
        <Col>
        <div>
        <div><span style={{"white-space" : "nowrap"}}><h3 style={{"color" : "blue"}}> {this.state.dis[0]?this.state.dis[0].name:null}</h3></span></div>
        <div><span style={{"white-space" : "nowrap"}}><h3 id="redc"> {this.state.dis[0]?this.state.dis[0].site:null}</h3></span></div>
        <div class="hr"><hr /></div>
        <div><span style={{"white-space" : "nowrap"}}><h3>Mobile: {this.state.dis[0]?this.state.dis[0].phone:null}</h3></span></div>
        <div><span style={{"white-space" : "nowrap"}}><h4> {this.state.dis[0]?this.state.dis[0].com:null}</h4></span></div>
        </div>
        <Row>
        <Col></Col>
        <Col>
        <span style={{"white-space" : "nowrap"}}>
        <Button onClick={(e) => this.onSubmit()}>My Profile</Button>
        <Button>Email Me</Button>
        </span></Col>
        </Row>
        </Col>


        <Col><div><Image src={this.state.dis[0]?this.state.dis[0].img:null}/></div>
        </Col>
        </Row>
        </Table>
        </Modal>
        </Col>
        </Row>
      </div>

      </div>

    );
  }
}


export default withFirebase(Overview);
