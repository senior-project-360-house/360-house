import React, { Component, MapContainer } from 'react';

import {load_google_maps, load_bus, load_school,load_market,load_shop } from './utils';
import geolib from 'geolib'

class MapPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filtered: null,
      sidebarOpen: false,
      query: ""
    }
  }

  componentDidMount() {
    let googleMapsPromise = load_google_maps();
    let bus = load_bus();
    let school = load_school();
    let market = load_market();
    let shop = load_shop();
    let position = {
      lat: 37.3382,
      lng: -121.8863
    }
    let icon = "https://maps.google.com/mapfiles/kml/shapes/";
    let busIcon = icon+"bus_maps.png";
    let shopIcon = icon+"shopping_maps.png";
    let schoolIcon = icon+"schools.png";
    let marketIcon = icon+"grocery.png";
    let house = icon+"homegardenbusiness.png";

    Promise.all([
      googleMapsPromise,
      bus,
      school,
      market,
      shop
    ]).then(values => {
      let google = values[0];
      let venuesA = [];
      let lat = position.lat;
      let lng = position.lng;
      venuesA.push(values[1].response.venues);
      venuesA.push(values[2].response.venues);
      venuesA.push(values[3].response.venues);
      venuesA.push(values[4].response.venues);
      this.google = google;
      this.markers = [];
      this.infowindow = new google.maps.InfoWindow();
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom:12,
        scrollwheel: true,
        center: { lat: lat, lng: lng }
      });
      venuesA.forEach(venues => {
        this.venues = venues;
        this.venues.forEach(venue => {
          if(geolib.getDistance({latitude: lat, longitude: lng},{latitude: venue.location.lat, longitude: venue.location.lng}) <= 5000){
            console.log(venue.name);
            let marker;
            if(venue.name.includes("Bus Stop")){
              marker = new google.maps.Marker({
               position: { lat: venue.location.lat, lng: venue.location.lng },
               map: this.map,
               venue: venue,
               id: venue.id,
               name: venue.name,
               animation: google.maps.Animation.DROP,
               icon:busIcon
             });
           }
           else if(venue.name.includes("Shopping") && !venue.name.includes("Parking")){
             marker = new google.maps.Marker({
               position: { lat: venue.location.lat, lng: venue.location.lng },
               map: this.map,
               venue: venue,
               id: venue.id,
               name: venue.name,
               animation: google.maps.Animation.DROP,
               icon:shopIcon
              });
            }
            else if(venue.name.includes("Market")){
              marker = new google.maps.Marker({
                position: { lat: venue.location.lat, lng: venue.location.lng },
                map: this.map,
                venue: venue,
                id: venue.id,
                name: venue.name,
                animation: google.maps.Animation.DROP,
                icon:marketIcon
               });
             }
             else if(venue.name.includes("School")){
               marker = new google.maps.Marker({
                 position: { lat: venue.location.lat, lng: venue.location.lng },
                 map: this.map,
                 venue: venue,
                 id: venue.id,
                 name: venue.name,
                 animation: google.maps.Animation.DROP,
                 icon:schoolIcon
                });
              }
              else{
                marker = new google.maps.Marker({
                  position: { lat: lat, lng: lng },
                  map: this.map,
                  name: "You are here",
                  animation: google.maps.Animation.DROP,
                  icon:house
                 });
               }
            marker.addListener('click', () => {
              if (marker.getAnimation() !== null) { marker.setAnimation(null); }
              else { marker.setAnimation(google.maps.Animation.BOUNCE); }
              setTimeout(() => { marker.setAnimation(null) }, 1500);
            });

            google.maps.event.addListener(marker, 'click', () => {
               this.infowindow.setContent(marker.name);
               this.map.setCenter(marker.position);
               this.infowindow.open(this.map, marker);
               this.map.panBy(0, -125);
            });
            this.markers.push(marker);
          }
        });


      });

    })
  }
  render() {
    return (
        <div style={{height:'1000px', width:'1000px'}} id="map"></div>
    );
  }
}

export default MapPage;
