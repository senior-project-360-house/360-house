import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Collapse, Button, Navbar, NavItem, Nav} from 'reactstrap';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './carousel.css'
import ReactBootstrapCarousel from "react-bootstrap-carousel";
import RBCarousel from "react-bootstrap-carousel";
import {withFirebase} from '../../server/Firebase/index';
let infor;


class SingleHome extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      isLoading: false,
      showText: false,
      dis: []
    }
  }



  componentDidMount() {
    this.setState({isLoading: true});
    this.props.firebase.database.ref('houses').on('value', (snapshot) => {
      const furnitures = snapshot.val().house1;
      let newState = [];
      newState.push({

        description: furnitures.propertyInfor.description,
        bedroom:furnitures.propertyInfor.details.beds,
        bathroom:furnitures.propertyInfor.details.baths,
        heat:furnitures.propertyInfor.details.heat,
        cooling:furnitures.propertyInfor.details.cool,
        parking:furnitures.propertyInfor.details.garage,
        year: furnitures.propertyInfor.details.year,
        area: furnitures.propertyInfor.details.area,
        sqrt: furnitures.propertyInfor.details.squareFeet,
        lotSize: furnitures.propertyInfor.details.lotSize,
        firePlace: furnitures.propertyInfor.details.firePlace,
        schoolDistrict: furnitures.propertyInfor.details.schoolDistrict
      });
      this.setState({dis: newState});
    });
  }

  // componentWillUnmount() {
  //   this.props.firebase.database().ref('houses').off();
  // }




  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  render(){
    let space = "   ";
    return(
      <div>
      <div>
          <img src="https://img.icons8.com/ios/20/000000/home-page.png"/><a> <strong>Mansion</strong>  <img src="https://img.icons8.com/ios/20/000000/bedroom.png"/>   <strong>   Bedroom {this.state.dis[0]?this.state.dis[0].bedroom:null}{space}</strong>   <img src="https://img.icons8.com/ios/20/000000/bath.png"/><strong>   Bathroom {this.state.dis[0]?this.state.dis[0].bathroom:null}</strong></a>
      </div>
      <p>{this.state.dis[0]?this.state.dis[0].description:null}</p>

      <div id="demo" className={"collapse" + (this.state.open ? ' in' : '')}>
      <h4>Fact and Features</h4>
      <table size="100" responsive borderless striped bordered hover>
        <tbody>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/calendar.png"/><strong> Year built: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].year:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/sun.png"/><strong> Heating: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].heat:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/air-conditioner.png"/><strong> Cooling: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].cooling:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/garage.png"/><strong> Parking: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].parking:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/tax.png"/><strong> Area: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].area:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/map.png"/><strong> Sqft: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].sqrt:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/map.png"/><strong> Lot Size: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].lotSize:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/map.png"/><strong> Fire Place: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].firePlace:null}</td>
        </tr>
        <tr>
          <td><img src="https://img.icons8.com/ios/20/000000/map.png"/><strong> School District: </strong> </td>
          <td>{this.state.dis[0]?this.state.dis[0].schoolDistrict:null}</td>
        </tr>
        </tbody>
      </table>
      </div>
      <a onClick={this.toggle.bind(this)}>Read description...</a>

      </div>
    );
  }
}

export default withFirebase (SingleHome);
