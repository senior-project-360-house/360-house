// Add a new house
import React, { Component } from "react";
import { withFirebase } from "../../server/Firebase/index";
import FileUploader from "react-firebase-file-uploader";
import Modal from "react-responsive-modal";
import { Redirect, Router, Route } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { withRouter } from "react-router";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import { Card, Icon, Image } from "semantic-ui-react";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import "./style.css";
import FIleUploaderShowImage from "./FIleUploaderShowImage";
let path;
let remember;
let tempId = "";
let first = true;

const authUser = JSON.parse(localStorage.getItem("authUser"));

const INITIAL_STATE = {
  newHouse: {
    propertyInfor: {},
    details:{},
    address: "",
    area: "",
    schoolDistrict: "",
    lotSize: "",
    squareFeet: "",
    listPrice: "",
    year: "",
    description: "",
    tour: "",
    beds: null,
    baths: null,
    cool: null,
    heat: null,
    firePlace: null,
    imgs: [],
    garare: null
  },
  error: null,
  progress: 0,
  isUploading: false,
  files: [],
  urls: []
};

class AddHouse extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     ...INITIAL_STATE,
     newHouseID: "",
     agent:{
       company: authUser.company,
       aboutme: authUser.aboutme,
       email: authUser.email,
       license: authUser.licenseNumber,
       name: authUser.firstName+' '+authUser.lastName,
       office: authUser.officeLocation,
       phone: authUser.phonenumber,
       profilePicture: authUser.avatar
     },
     propertyInfor: {},
     details:{},
     thumbnail: "",
     avatarFile: "",
     isUploading: false,
     errors: {},
     progress: 0
   };
   this.onSubmit = this.onSubmit.bind(this);
  }



  onSubmit = event => {
    //this.addHouse();
    const {
      newHouse,
      agent:{
        company,
        aboutme,
        email,
        license,
        name,
        office,
        phone,
        profilePicture,
      },
      propertyInfor,
      details,
      address,
      area,
      schoolDistrict,
      lotSize,
      squareFeet,
      listPrice,
      year,
      description,
      tour,
      beds,
      baths,
      cool,
      heat,
      firePlace,
      imgs,
      garare, urls, files } = this.state;
    let images = [];
    let promises = [];

      Object.values(files).forEach((img, index) => {
        const name = Date.now();
        let imagePath = `images/house/${index + name}`;
        const uploadTask = this.props.firebase.storage
          .ref(imagePath)
          .put(img)
          .then();
        promises.push(uploadTask);
      });
      Promise.all(promises).then(snapshots => {
        let urlsPromises = [];
        snapshots.forEach(snapshot => {
          urlsPromises.push(snapshot.ref.getDownloadURL());
        });
        Promise.all(urlsPromises).then(urlSnapshots => {
          this.props.firebase
            .houses()
            .push({
              // ...newHouse,
              agent:{
                company,
                aboutme,
                email,
                license,
                name,
                office,
                phone,
                profilePicture,
              },
              images: urlSnapshots,
              propertyInfor: {
                description,
                details:{
                  address,
                  area,
                  schoolDistrict,
                  lotSize,
                  squareFeet,
                  listPrice,
                  year,
                  beds,
                  baths,
                  cool,
                  heat,
                  firePlace,
                  garare
                }
              },
              tour,
            })
            .then(() => {
              this.setState({ ...INITIAL_STATE });

            })
            .catch(error => {
              this.setState({ error });
            });
        });
      });
      alert("New House Has Been Added To your Profile!")
      event.preventDefault();

  };


  //Get input from user
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onClick = () => {
    this.props.history.push(ROUTES.LANDING);
  };

  customOnChangeHandler = event => {
     event.preventDefault();
     this.setState({
       imgs: event.target.files
     });
   };

  render() {
    return (
      <div>
        <Container>
          <div class="row">
            <div class="col-md-9 personal-info">
              <h3 style={{ textAlign: "center" }}>House Information</h3>

              <form
                class="form-horizontal"
                role="form"
                onSubmit={this.onSubmit}
              >
                <div class="form-group">
                  <label class="col-lg-3 control-label">Address:</label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      name="address"
                      type="text"
                      placeholder={"Enter Address House"}
                      value={this.state.address}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-3 control-label">
                    Area:
                  </label>
                  <div class="col-lg-8">
                    <input
                      class="form-control"
                      type="text"
                      name="area"
                      placeholder={"Enter Area"}
                      onChange={this.onChange}
                      value={this.state.area}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-3 control-label">School District</label>

                  <div class="col-lg-4">
                    <input
                      class="form-control"
                      type="text"
                      name="schoolDistrict"
                      placeholder={"Enter State"}
                      onChange={this.onChange}
                      value={this.state.schoolDistrict}

                    />
                  </div>
                </div>

                {/* lot size and square feet */}
                <div class="form-group">
                  <label class="col-lg-3 control-label">
                    Lot Size and Square Feet
                  </label>
                  <div class="col-lg-4">
                    <input
                      class="form-control"
                      type="text"
                      name="lotSize"
                      placeholder={"Enter lotSize"}
                      onChange={this.onChange}
                      value={this.state.lotSize}
                    />
                  </div>
                  <div class="col-lg-4">
                    <input
                      class="form-control"
                      type="text"
                      name="squareFeet"
                      placeholder={"Enter Square Feet House"}
                      onChange={this.onChange}
                      value={this.state.squareFeet}
                    />
                  </div>
                </div>

                {/* List listPrice and year */}
                <div class="form-group">
                  <label class="col-lg-3 control-label">
                    List listPrice and year
                  </label>
                  <div class="col-lg-4">
                    <input
                      class="form-control"
                      type="text"
                      name="listPrice"
                      placeholder={"Enter Your Listing listPrice"}
                      onChange={this.onChange}
                      value={this.state.listPrice}
                    />
                  </div>
                  <div class="col-lg-4">
                    <input
                      class="form-control"
                      type="text"
                      name="year"
                      placeholder={"Enter Your House Year"}
                      onChange={this.onChange}
                      value={this.state.year}
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-lg-3 control-label">Description:</label>
                  <div class="col-lg-8">
                    <textarea
                      rows={4}
                      cols={50}
                      name="description"
                      form="usrform"
                      defaultValue={"Enter text here..."}
                      onChange={this.onChange}
                      value={this.state.description}
                    />
                  </div>
                </div>
                {/* 360 degree tour */}
                <div class="form-group">
                  <label class="col-md-3 control-label">360-degree Tour:</label>
                  <div class="col-md-8">
                    <input
                      class="form-control"
                      type="text"
                      name="tour"
                      placeholder={"Enter Your 360 Tour"}
                      onChange={this.onChange}
                      value={this.state.tour}
                    />
                  </div>
                </div>

                {/* Add images */}
                <div class="form-group128">
                  <div>
                    <FIleUploaderShowImage
                      setIsUploading={isUploading =>
                        this.setState({ isUploading: isUploading })
                      }
                      setProgress={progress =>
                        this.setState({ progress: progress })
                      }
                      setFiles={files => this.setState({ files: files })}
                      setFileURL={urls => this.setState({ urls: urls })}
                      // ⇐ reference the component
                    />

                    <br />
                  </div>
                </div>

                {/* Bad, bed and other useful info */}
                <div class="form-group">
                  <form action="/action_page.php">
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/bedroom.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="beds"
                        onChange={this.onChange}
                        value={this.state.beds}
                      />
                    </div>
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/shower.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="baths"
                        onChange={this.onChange}
                        value={this.state.baths}
                      />
                    </div>
                  </form>
                </div>
                {/* cool and Heater */}
                <div class="form-group">
                  <form action="/action_page.php">
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/air-conditioner.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="cool"
                        onChange={this.onChange}
                        value={this.state.cool}
                      />
                    </div>
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/water-heater.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="heat"
                        onChange={this.onChange}
                        value={this.state.heat}
                      />
                    </div>
                  </form>
                </div>
                {/* fire horse and garage */}
                <div class="form-group">
                  <form action="/action_page.php">
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/fire-hydrant.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="firePlace"
                        onChange={this.onChange}
                        value={this.state.firePlace}
                      />
                    </div>
                    <label class="col-md-3 control-label">
                      <img src="https://img.icons8.com/ios-glyphs/30/000000/garage.png" />
                    </label>
                    <div class="col-md-2">
                      <input
                        class="form-control"
                        type="text"
                        name="garare"
                        onChange={this.onChange}
                        value={this.state.garare}
                      />
                    </div>
                  </form>
                </div>

                <div class="form-group">
                  <label class="col-md-3 control-label" />
                  <div class="col-md-3">
                    <input
                      type="submit"
                      class="btn btn-primary"
                      value="Add House"
                    />
                    <span />
                    <input type="reset" class="btn btn-default" value="Edit" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
export default withFirebase(AddHouse);
