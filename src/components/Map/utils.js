// import Geocode from "react-geocode";
// import React, { Component, MapContainer } from 'react';
// import {withFirebase} from '../../server/Firebase/index';
// const DEFAULT_QUERY = 'redux';

export function load_google_maps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };
    // Now, Load the Google Maps API
    const script = document.createElement("script");
    const API_KEY = "AIzaSyAErR_bvlA2EDGhUnh3IO5jm_6ntd3PxWU";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}
//Connect with firebase to get infor
export function load_bus(lat, lng) {
  while (lat === undefined) {}
  var apiURL =
    "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" +
    lat +
    "," +
    lng +
    "&client_id=33WT32N1WDP441XAFS0A11TGHTFBE354IJ3ITQQZSQ3ISS5F&client_secret=1H3TMSYK3Y3M5GMVZKRYPN5HQWWFOD03EUCTRBR4BZH0GYVW&v=20130619&query=bus";
  return fetch(apiURL).then(resp => resp.json());
}

export function load_school(lat, lng) {
  while (lat === undefined) {}
  var apiURL =
    "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" +
    lat +
    "," +
    lng +
    "&client_id=33WT32N1WDP441XAFS0A11TGHTFBE354IJ3ITQQZSQ3ISS5F&client_secret=1H3TMSYK3Y3M5GMVZKRYPN5HQWWFOD03EUCTRBR4BZH0GYVW&v=20130619&query=school";
  return fetch(apiURL).then(resp => resp.json());
}

export function load_school2(lat, lng) {
  while (lat === undefined) {}
  var apiURL =
    "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" +
    lat +
    "," +
    lng +
    "&client_id=33WT32N1WDP441XAFS0A11TGHTFBE354IJ3ITQQZSQ3ISS5F&client_secret=1H3TMSYK3Y3M5GMVZKRYPN5HQWWFOD03EUCTRBR4BZH0GYVW&v=20130619&query=college";
  return fetch(apiURL).then(resp => resp.json());
}

export function load_market(lat, lng) {
  while (lat === undefined) {}
  var apiURL =
    "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" +
    lat +
    "," +
    lng +
    "&client_id=33WT32N1WDP441XAFS0A11TGHTFBE354IJ3ITQQZSQ3ISS5F&client_secret=1H3TMSYK3Y3M5GMVZKRYPN5HQWWFOD03EUCTRBR4BZH0GYVW&v=20130619&query=market";
  return fetch(apiURL).then(resp => resp.json());
}

export function load_shop(lat, lng) {
  while (lat === undefined) {}
  var apiURL =
    "https://api.foursquare.com/v2/venues/suggestcompletion?ll=" +
    lat +
    "," +
    lng +
    "&client_id=33WT32N1WDP441XAFS0A11TGHTFBE354IJ3ITQQZSQ3ISS5F&client_secret=1H3TMSYK3Y3M5GMVZKRYPN5HQWWFOD03EUCTRBR4BZH0GYVW&v=20130619&query=shopping";
  return fetch(apiURL).then(resp => resp.json());
}

// export function getLatAndLong(){
//   let street = $street.split(' ').join('+')+',';
//   let city = $city.split(' ').join('+');
//   var apiURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+$number+street+city+$state+'&key=AIzaSyAErR_bvlA2EDGhUnh3IO5jm_6ntd3PxWU';
//   return fetch(apiURL).then(resp => resp.json());
//
// }
