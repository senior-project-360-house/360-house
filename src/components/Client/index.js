import React, { Component } from 'react';
import * as ROUTES from "../../constants/routes";
import {withFirebase} from '../../server/Firebase/index';
import {Container} from 'react-bootstrap';
//import for individual card
import Card from "react-bootstrap/Card";
import {Button} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
//for button
import "./client.css";

//css for client


let path;
let remember;
let imagesource = false;
const authUser = JSON.parse(localStorage.getItem("authUser"));
class Client extends React.Component {
  constructor(props) {
    super(props);
    path = this.props.history;

    // lastInfor = this.props.history.location.state;
    this.state = {
      isLoading: false,
      dis: [],
      authUser: {},
      favoritehouses: []
    };
    this.deleteAction = this.deleteAction.bind(this);
  }

  gettingHouse(){
    let houseId = authUser.favHouses.hs;

  }

 deleteAction() {

   var userRef = this.props.firebase.database.ref('users/' + authUser.uid);
   userRef.child('favHouses').update({hs: null});

 }


  componentDidMount() {
    this.setState({isLoading: true});
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    let houseId = authUser.favHouses.hs;
    this.props.firebase.database.ref('account').on('value', (snapshot) => {
      const data = snapshot.val().userAccount;
      let newState = [];
      let imgs = data.userAccount1;
      newState.push({
                name: imgs.name,
                email: imgs.email,
                img: imgs.img,
                isAgent: imgs.isAgent,
                passWord: imgs.passWord
                });

      this.setState({favoritehouses: newState , authUser: authUser});
    });
    if(houseId){
      imagesource = true;
      this.props.firebase.database.ref('houses/' + houseId).on('value', (snapshot) => {
        let h = snapshot.val();
        let imgs = h.image;
        console.log(h.propertyInfor.details.listPrice);
        let newState = [];
        newState.push({
                  image: h.image["image1"],
                  address: h.propertyInfor.details.address,
                  price: h.propertyInfor.details.listPrice,
                  });
                  this.setState({favoritehouses: newState , authUser: authUser});
      });

    }else{
      imagesource = false;
    }

  }

  onProfile(){
    path.push({
    pathname: './clientform'},remember);
  };

  onEdit(){
    path.push({
      pathname: './clientedit', remember
    })
  }

  onSubmit(){
    path.push({
      pathname: './overview', remember
    })
  }


  buildHouse(house){
    return(
      <div className="single-house">
        <div className="SingleHouseInfo">
          <Image src={house.image} alt="" />
          <h2> Price: {house.price}
          <br />
          {house.address}
          </h2>
        </div>
        <div style={this.state.hide ? {visibility: "hidden"}: {visibility: "visible"} }
        className="clientbutton">
        <Button variant="danger" onClick = {this.deleteAction}>Delete</Button>
      </div>
    </div>
    );
  }


buildFavoriteHouseList(){
  const Panel = this.state.favoritehouses.map(house=>{
    return this.buildHouse(house)
  });
  return <div>{Panel}</div>;
}

printEmpty(){
  return(
    <div>
      <Container>
        <div className="suggestion">
        <h3>Your favorite list is empty.
        
        You can try the below suggestions and add houses to the list for later.
        </h3>
        
        <div class="list-type5">
        <ol>
        <li><p>Search by Zipcode ? </p></li>
        <li><p>Search by street address ? </p></li>
        <li><p>Search by city ? </p></li>
        </ol>
        </div>
        </div>
        </Container>
    </div>
  );
}

  render() {
    const {isLoading, authUser} = this.state;
    remember = this.state.dis;

    return (
      <div className="clientContent">
      {/* {isLoading ? (
        <h1> Loading...</h1>)
          :
      ( */}
        <div>
        <div className="TopBar container navRender">
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Nav.Link>
                <span id="nav01" className="textNav activeNav">
                  {"Favorite House"}
                </span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={ROUTES.HOMEPAGE}>
                <span id="nav03" className="textNav">
                  {"Find a house"}
                </span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="row">
        <div className="ClientColumn col-sm-2">
        <Card style={{ "box-shadow": "5px 4px 8px 5px rgba(0,0,0,0.2)" }} className="ClientInfo">
        <Card.Img className="ClientImage" variant="top" src={"https://i.imgur.com/onLuiBV.jpg"}/>
        <Card.Body>
        <Card.Title>
          <h3 class="ClientName">{authUser.firstName + " " +authUser.lastName}</h3>
        </Card.Title>
        {authUser.isAgent !== "true" ? (
                      <div
                        className="btn-edit"
                        style={
                          this.state.hide
                            ? { visibility: "hidden" }
                            : { visibility: "visible" }
                        }
                      >
                        <Button onClick={e => this.onEdit()}>
                          Edit Profile
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
        </Card.Body>
        </Card>
        {/* <p>Hello </p> */}
        </div>
        <div className="FavoriteHouseColumn col-sm-10">
        {(imagesource)?this.buildFavoriteHouseList():this.printEmpty()}
        {/* <p>Hello</p> */}
        </div>
        </div>
        </div>


      {/* )
      } */}
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

// createCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default  withFirebase(Client);


// return (
//   <div className="ClientForm">
//   <Container className="ContainerClient">
//   <div class="row">
//     <div class="left col-lg-3">
//       <div class="photo-left">
//         <Image className="PhotoClient" src={this.state.dis[0]?this.state.dis[0].img:null}/>
//       </div>
//       <h1 className="ClientName">{this.state.dis[0]?this.state.dis[0].name:null}</h1>
//       <p className="ClientNameInfo">Realtor</p>
//       <p className="ClientEmail">{this.state.dis[0]?this.state.dis[0].email:null}</p>
//       <div className="stats row">
//       </div>

//       {authUser.isAgent==="true" ? (<div>
//         <ButtonGroup>
//         <Button onClick={(e) => this.onProfile()}>My Profile</Button>
//         <Button onClick={(e) => this.onEdit()}>Edit Profile</Button>
//         </ButtonGroup>
//       </div>) : ""}


//     </div>




//     {/* tạo 1 function đi map data ra theo dạng image gallery */}

//     <div class="right col-lg-8">
//       <ul class="navXX">
//         <li>FAVORITE HOUSE</li>
//         <li>SAVED RENDERS</li>
//         <li onClick={(e) => this.backHome()}>FIND A HOME</li>
//       </ul>
//       <div class="row gallery">
//         <div class="col-md-4">
//         <img onClick={(e) => this.onSubmit()} src="https://imgur.com/GqgkPSx.jpg"/>
//         </div>
//           <div class="col-md-4">
//             <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo5.jpg"/>
//           </div>
//           <div class="col-md-4">
//             <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774814-photo6.jpg"/>
//           </div>
//           <div class="col-md-4">
//             <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774817-photo1.jpg"/>
//           </div>
//           <div class="col-md-4">
//             <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774815-photo2.jpg"/>
//           </div>
//           <div class="col-md-4">
//             <img src="https://image.noelshack.com/fichiers/2017/38/2/1505774816-photo3.jpg"/>
//           </div>
//       </div>
//     </div>
//       </div>
//       </Container>

//       </div>
//     );
//   }
// }
