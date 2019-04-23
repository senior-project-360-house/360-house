import React from "react";

import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import { Container, Button } from "react-bootstrap";
import { withFirebase } from "../../server/Firebase/index";
const authUser = JSON.parse(localStorage.getItem("authUser"));



let faveList = [];

class HomeCarousel extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.firebase.database.ref("houses"));
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      index: 0,
      houseId: "",
      direction: null,
      open: false,
      isLoading: false,
      showText: false,
      dis: []
    };
    this.addHouse = this.addHouse.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  addHouse(){
    var number = Object.keys(authUser.favHouses).length;
    let id = this.state.houseId;
    var userRef = this.props.firebase.database.ref('users/' + authUser.uid).child('favHouses').push({id});
    alert("House has been added to your favorit list!");
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.database.ref("houses").on("value", snapshot => {
      const furnitures = snapshot.val().house1;
      let newState = [];
      let imgs = furnitures.images;
      for (var x in imgs) {
        newState.push(imgs[x]);
      }
      this.setState({ dis: newState, houseId: "house1" });
    });
  }

  handleFirstName(e) {
      let value = e.target.value;
      this.setState( prevState => ({ newUser :
           {...prevState.newUser, firstName: value
           }
     }))
     }



  render() {
    const { index, direction } = this.state;
    let images = this.state.dis;
    faveList.push(this.state.houseId);
    return (
      <div className="HouseShow">
        <div className="top">
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
          >
            {images.map(data => {
              return fillIn(data);
            })}
          </Carousel>
        </div>

        <div style={{"text-align": "center"}}className="bottom">
          <h3>Price: $2,000,000</h3>
          <h3>Address: 1234 Tully Road, San Jose CA, 95111</h3>
          {authUser.isClient === "true" ? (
                       <Button onClick = {this.addHouse} style={{"display": "inline-block"}}>Add to favorite list </Button>
                      ) : (
                        ""
                      )}
        </div>
      </div>
    );
  }
}

function fillIn(image) {
  return (
    <Carousel.Item>
      <Image
        atl="#"
        className="image d-block w-100"
        src={image}
        alt="House Images"
      />

      <Carousel.Caption>
        {/* <h3>Information</h3> */}
        {/* <p>Information</p> */}
      </Carousel.Caption>
    </Carousel.Item>
  );
}
export default withFirebase(HomeCarousel);
