import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Media from "react-bootstrap/Media";
import { withFirebase } from "../../server/Firebase/index";
// import { FaBed } from "react-icons/lib/fa";
import {
  faBath,
  faHome,
  faBed,
  faRulerHorizontal,
  faBuilding,
  faTshirt,
  faSun,
  faSnowflake,
  faDog,
  faParking
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadMoreAndLess from "react-read-more-less";

class SingleHome extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      showText: false,
      dis: []
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.props.firebase.database.ref("houses").on("value", snapshot => {
      const furnitures = snapshot.val().house1;
      let newState = [];
      newState.push({
        description: furnitures.propertyInfor.description,
        bedroom: furnitures.propertyInfor.details.beds,
        bathroom: furnitures.propertyInfor.details.baths,
        heat: furnitures.propertyInfor.details.heat,
        cooling: furnitures.propertyInfor.details.cool,
        parking: furnitures.propertyInfor.details.garage,
        year: furnitures.propertyInfor.details.year,
        area: furnitures.propertyInfor.details.area,
        sqrt: furnitures.propertyInfor.details.squareFeet,
        lotSize: furnitures.propertyInfor.details.lotSize,
        firePlace: furnitures.propertyInfor.details.firePlace,
        schoolDistrict: furnitures.propertyInfor.details.schoolDistrict
      });
      this.setState({ dis: newState });
    });
  }

  render() {
    const para = this.state.dis[0] ? this.state.dis[0].description : "";
    return (
      <div className="Housedetails">
        <div className="top">
          <FontAwesomeIcon icon={faHome} className="icon" />
          <span className="textTop">Mansion</span>
          |<FontAwesomeIcon icon={faBed} className="icon" />
          <span className="textTop">
            Bedroom: {this.state.dis[0] ? this.state.dis[0].bedroom : null}
          </span>
          <br />
          {/* <FaBed className="icon" /> */}
          <FontAwesomeIcon icon={faBath} className="icon" />
          <span className="textTop">
            Bathroom: {this.state.dis[0] ? this.state.dis[0].bathroom : null}
          </span>
          |<FontAwesomeIcon icon={faRulerHorizontal} className="icon" />
          <span className="textTop">
            {this.state.dis[0] ? this.state.dis[0].sqrt : "0"}sqrt
          </span>
        </div>
        <div className="middle">
          <ReadMoreAndLess
            ref={this.ReadMore}
            className="read-more-content"
            charLimit={250}
            readMoreText="Read more"
            readLessText="Read less"
          >
            {para}
          </ReadMoreAndLess>
        </div>
        <div className="bottomX>">
          <h2>Facts and Features</h2>
          <div className="factX">
            <Row>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faBuilding} className="icon" />
                  <Media.Body>
                    <h2>Type</h2>
                    <p>Single Family</p>
                  </Media.Body>
                </Media>
              </Col>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faTshirt} className="icon" />
                  <Media.Body>
                    <h2>Laundry</h2>
                    <p>In Unit</p>
                  </Media.Body>
                </Media>
              </Col>
            </Row>
            <Row>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faSun} className="icon" />
                  <Media.Body>
                    <h2>Heating</h2>
                    <p>{this.state.dis[0] ? this.state.dis[0].heat : ""}</p>
                  </Media.Body>
                </Media>
              </Col>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faSnowflake} className="icon" />
                  <Media.Body>
                    <h2>Cooling</h2>
                    <p>{this.state.dis[0] ? this.state.dis[0].cooling : ""}</p>
                  </Media.Body>
                </Media>
              </Col>
            </Row>
            <Row>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faDog} className="icon" />
                  <Media.Body>
                    <h2>Pets</h2>
                    <p>No</p>
                  </Media.Body>
                </Media>
              </Col>
              <Col sm={5} className="ColFact">
                <Media>
                  <FontAwesomeIcon icon={faParking} className="icon" />
                  <Media.Body>
                    <h2>Parking</h2>
                    <p>{this.state.dis[0] ? this.state.dis[0].parking : ""}</p>
                  </Media.Body>
                </Media>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(SingleHome);
