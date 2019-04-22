import React, { Component, MapContainer } from "react";
import MapUtil from "./utils.js";
import {
  load_google_maps,
  load_bus,
  load_school,
  load_school2,
  load_market,
  load_shop,
  getLatAndLong
} from "./utils";
import { withFirebase } from "../../server/Firebase/index";
import geolib from "geolib";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import "./style.css";
import NavBars from "../Overview/NavBar";
let shortestBus = {
  name: "",
  distance: 16000
};
let shortestSchool = {
  name: "",
  distance: 16000
};
let shortestMarket = {
  name: "",
  distance: 16000
};
let shortestShopping = {
  name: "",
  distance: 16000
};

class MapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      items: []
    };
  }
  componentDidMount() {
    const itemsRef = this.props.firebase.database.ref("houses");
    document.querySelector("#nav02").classList.remove("activeNav");
    document.querySelector("#nav01").classList.remove("activeNav");
    document.querySelector("#nav03").classList.remove("activeNav");
    document.querySelector("#nav04").classList.add("activeNav");
    itemsRef.on("value", snapshot => {
      let hs = snapshot.val();
      let newState = [];
      newState.push({
        lat: hs.house1.lat,
        lng: hs.house1.lng
      });
      this.setState({
        items: newState
      });
    });
  }
  render() {
    let lat = 37.29465;
    let lng = -121.78171;
    let icon = "https://maps.google.com/mapfiles/kml/shapes/";
    let busIcon = icon + "bus_maps.png";
    let shopIcon = icon + "shopping_maps.png";
    let schoolIcon = icon + "schools.png";
    let marketIcon = icon + "grocery.png";
    let house = icon + "homegardenbusiness.png";
    let googleMapsPromise = load_google_maps();

    // let lat = Number(this.state.items[0]?this.state.items[0].lat:null);
    // let lng = Number(this.state.items[0]?this.state.items[0].lng:null);
    // console.log(lat);

    let bus = load_bus(lat, lng);
    let school = load_school(lat, lng);
    let school2 = load_school2(lat, lng);
    let market = load_market(lat, lng);
    let shop = load_shop(lat, lng);
    Promise.all([googleMapsPromise, bus, school, school2, market, shop]).then(
      values => {
        let google = values[0];
        let venuesA = [];
        this.google = google;
        this.markers = [];
        this.infowindow = new google.maps.InfoWindow();
        venuesA.push(values[1].response.minivenues);
        venuesA.push(values[2].response.minivenues);
        venuesA.push(values[3].response.minivenues);
        venuesA.push(values[4].response.minivenues);
        venuesA.push(values[5].response.minivenues);
        let position = {
          lat: lat,
          lng: lng
        };
        this.map = new google.maps.Map(document.getElementById("map"), {
          zoom: 12,
          scrollwheel: true,
          center: { lat: lat, lng: lng }
        });

        venuesA.forEach(venues => {
          this.venues = venues;

          this.venues.forEach(venue => {
            if (
              geolib.getDistance(
                { latitude: lat, longitude: lng },
                { latitude: venue.location.lat, longitude: venue.location.lng }
              ) <= 16000
            ) {
              let marker;
              if (venue.name.includes("Bus Stop")) {
                if (venue.location.distance < shortestBus.distance) {
                  shortestBus.name = venue.name;
                  shortestBus.distance = venue.location.distance;
                }
                marker = new google.maps.Marker({
                  position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng
                  },
                  map: this.map,
                  venue: venue,
                  id: venue.id,
                  name: venue.name,
                  animation: google.maps.Animation.DROP,
                  icon: busIcon
                });
              } else if (
                venue.name.includes("Shopping") &&
                !venue.name.includes("Parking")
              ) {
                if (venue.location.distance < shortestShopping.distance) {
                  shortestShopping.name = venue.name;
                  shortestShopping.distance = venue.location.distance;
                }
                marker = new google.maps.Marker({
                  position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng
                  },
                  map: this.map,
                  venue: venue,
                  id: venue.id,
                  name: venue.name,
                  animation: google.maps.Animation.DROP,
                  icon: shopIcon
                });
              } else if (venue.name.includes("Market")) {
                if (venue.location.distance < shortestMarket.distance) {
                  shortestMarket.name = venue.name;
                  shortestMarket.distance = venue.location.distance;
                }
                marker = new google.maps.Marker({
                  position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng
                  },
                  map: this.map,
                  venue: venue,
                  id: venue.id,
                  name: venue.name,
                  animation: google.maps.Animation.DROP,
                  icon: marketIcon
                });
              } else if (
                venue.name.includes("School") ||
                venue.name.includes("College") ||
                venue.name.includes("University")
              ) {
                if (venue.location.distance < shortestSchool.distance) {
                  {
                    shortestSchool.name = venue.name;
                    shortestSchool.distance = venue.location.distance;
                  }
                }
                marker = new google.maps.Marker({
                  position: {
                    lat: venue.location.lat,
                    lng: venue.location.lng
                  },
                  map: this.map,
                  venue: venue,
                  id: venue.id,
                  name: venue.name,
                  animation: google.maps.Animation.DROP,
                  icon: schoolIcon
                });
              } else {
                if (venue.location.distance < shortestMarket.distance) {
                  {
                    shortestMarket.name = venue.name;
                    shortestMarket.distance = venue.location.distance;
                  }
                }
                marker = new google.maps.Marker({
                  position: { lat: lat, lng: lng },
                  map: this.map,
                  name: "You are here",
                  animation: google.maps.Animation.DROP,
                  icon: house
                });
              }
              marker.addListener("click", () => {
                if (marker.getAnimation() !== null) {
                  marker.setAnimation(null);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                }
                setTimeout(() => {
                  marker.setAnimation(null);
                }, 1500);
              });
              google.maps.event.addListener(marker, "click", () => {
                this.infowindow.setContent(marker.name);
                this.map.setCenter(marker.position);
                this.infowindow.open(this.map, marker);
                this.map.panBy(0, -125);
              });
              this.markers.push(marker);
            }
          });
          console.log(shortestShopping);
        });
      }
    );
    return (
      <div className="Map">
        <div className="TopBar">
          <NavBars />
        </div>
        <div className="mapDeatil">
          <Row>
            <Col className="GoogleMap" id="map" lg={10} />
            <Col lg={2}>
              <h2>Nearby Location</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{shortestSchool.name}</td>
                    <td>{convertToMile(shortestSchool.distance)} miles</td>
                  </tr>
                  <tr>
                    <td>{shortestBus.name}</td>
                    <td>{convertToMile(shortestBus.distance)} miles</td>
                  </tr>
                  <tr>
                    <td>{shortestMarket.name}</td>
                    <td>{convertToMile(shortestMarket.distance)} miles</td>
                  </tr>
                  <tr>
                    <td>{shortestShopping.name}</td>
                    <td>{convertToMile(shortestShopping.distance)} miles</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function convertToMile(distance) {
  return parseFloat((Number(distance) * 0.00062137).toFixed(2));
}

export default withFirebase(MapPage);
