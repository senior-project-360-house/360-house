import { withFirebase } from "../../server/Firebase/index";
import React from "react";

import * as ROUTES from "../../constants/routes";
import NavBars from "../Overview/NavBar.js";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "./style.css";
var room = [];
let path;

class Render extends React.Component {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    path = this.props.history;
    this.state = {
      index: 0,
      direction: null,
      items: []
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }
  // changeSlide() {}
  componentDidMount() {
    const itemsRef = this.props.firebase.database.ref("houses");
    document.querySelector("#nav02").classList.remove("activeNav");
    document.querySelector("#nav01").classList.remove("activeNav");
    document.querySelector("#nav03").classList.add("activeNav");
    document.querySelector("#nav04").classList.remove("activeNav");
    itemsRef.on("value", snapshot => {
      let hs = snapshot.val();
      let newState = [];

      for (let r in hs.house1.render) {
        let name = r;
        newState.push({
          name: name,
          dimension: hs.house1.render[r].dimension,
          id: hs.house1.render[r].renderId,
          img: hs.house1.render[r].image
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  rightside(index) {
    return (
      <div className="rightsideInfo">
        <p> {this.state.items[index] ? this.state.items[index].name : null}</p>
        <Table striped bordered hover className="HouseInfo">
          <tbody>
            <tr>
              <td>Size:</td>
              <td>{index}</td>
            </tr>
            <tr>
              <td>Dimesion:</td>
              <td>
                {this.state.items[index]
                  ? this.state.items[index].dimension
                  : null}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    room = this.state.items;
    var count = 0;
    const { index, direction } = this.state;

    return (
      <div className=" overviewLayout">
        <div className="row navbar">
          <NavBars />
        </div>

        <div className="mainHouseImage">
          <Row>
            <Col md={9}>
              <Carousel
                fade={"true"}
                activeIndex={index}
                direction={direction}
                onSelect={this.handleSelect}
                // onSlideEnd={this.changeSlide}
              >
                {room.map(data => {
                  count++;
                  return leftside(data.img, data.id, data.name, count);
                })}
              </Carousel>
            </Col>

            <Col md={3} className="RightSide">
              {this.rightside(index)}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

function leftside(link, id, name, count) {
  return (
    <Carousel.Item itemId={count}>
      <img className="d-block w-100 imagehouse" src={link} alt={name} />
      <Carousel.Caption>
        <div className="row">
          <h3>{name}</h3>

          <Button
            className="infoButton"
            onClick={e => onSubmit(id)}
            variant="primary"
          >
            Explore
          </Button>
        </div>
      </Carousel.Caption>
    </Carousel.Item>
  );
}

function onSubmit(id) {
  window.sced = id;
  path.push({
    pathname: ROUTES.RENDERROOM
  });
}

export default withFirebase(Render);
