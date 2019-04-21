// import React, { Component } from 'react';
//
// import { Redirect, Router, Route } from 'react-router-dom';
// import * as ROUTES from "../../constants/routes";
// import { withRouter } from 'react-router';
//
// import {Container} from 'react-bootstrap';
// import {ButtonGroup} from 'reactstrap';
// import {Button} from 'reactstrap';
//
// let path;
// let remember;
//
// let lastInfor;
// class Agent extends Component {
//
//   constructor(props) {
//     super(props);
//     path = this.props.history;
//     lastInfor = this.props.history.location.state;
//   }
//
//   onSubmit(){
//     path.push({
//     pathname: ROUTES.OVERVIEW},
//     remember);
//   };
//
//   backHome(){
//     path.push({
//     pathname: ROUTES.LANDING},
//     remember);
//   };
//
//
//
//   //todo
//   //build a edit, delete button for each house
//   //add new house button
//   render() {
//     return (
//       <div className="AgentProfile">
//   <Container style={{"margin-top":"200px"}}>
//   <div class="row">
//     <div class="left col-lg-4">
//       <div class="photo-left">
//         <img class="photo" src="https://imgur.com/9ANQ0cX.jpg"/>
//       </div>
//       <h4 class="name">{lastInfor[0].name}</h4>
//       <p class="info">Realtor</p>
//       <p class="info">{lastInfor[0].site}</p>
//       <div class="stats row">
//       </div>
//       <p class="desc">{lastInfor[0].des}</p>
//       <div>
//         <ButtonGroup>
//         <Button color="primary" style={{"margin-left": "20px"}} onClick={(e) => onProfile()}>Edit</Button>
//         <Button color="info" style={{"margin-left": "20px"}} onClick={(e) => this.onEdit()}>Add new house</Button>
//         </ButtonGroup>
//       </div>
//     </div>
//
//     <div class="right col-lg-8">
//       <ul class="nav">
//         <li>OPEN HOUSES</li>
//         <li onClick={(e) => this.backHome()}>Find a home</li>
//         <li onClick={(e) => this.backHome()}>See as user</li>
//       </ul>
//       <div class="row gallery">
//         <div class="col-md-4" style={{"align": "center"}}>
//         <img onClick={(e) => this.onSubmit()} src="https://imgur.com/GqgkPSx.jpg"/>
//         <ButtonGroup style={{"margin": "10px", "alignContent": "center"}}>
//         <Button color="info" style={{"margin": "10px"}}>Edit</Button>
//         <Button color="danger" style={{"margin": "10px"}} >Delete</Button>
//         </ButtonGroup>
//         </div>
//         {/* <div class="col-md-4">
//           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg"/>
//         </div>
//         <div class="col-md-4">
//           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg"/>
//         </div>
//         <div class="col-md-4">
//           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg"/>
//         </div>
//         <div class="col-md-4">
//           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg"/>
//         </div>
//         <div class="col-md-4">
//           <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg"/>
//         </div> */}
//       </div>
//     </div>
//       </div>
//       </Container>
//       </div>
//     );
//   }
// }
// function onProfile(){
//   path.push({
//   pathname: ROUTES.AGENTPROFILE},
//   remember);
// };
// export default Agent;
