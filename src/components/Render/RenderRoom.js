import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import FunitureDetail from "./FunitureDetail";

import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import { withFirebase } from "../../server/Firebase/index";
import $ from "jquery";
import { Button } from "reactstrap";
import claraService from "./Clara";
import { Accordion } from "semantic-ui-react";
import Popup from "reactjs-popup";
import "./renderroom.css";
import NavBar from "../Overview/NavBar";
import {
  faBed,
  faChair,
  faCouch,
  faArchway
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
let clara;

let sceneId = "921754c6-d081-4e97-af23-178124591393";
//clara.sceneIO.fetchAndUse(sceneId);
let importSceneId = "f85ef7a2-6aaa-4333-ba69-1e8f121c4706";
let mouseID = "";
let groupId = "";
var THREE = "";
var groupIdAttachIdsMap = {};
var attachPointLocation = {};
var bed = [];
var bedimg = [];
var chair = [];
var sofa = [];
var kit = [];
var result = [];

class RenderRoom extends Component {
  constructor(props) {
    super(props);
    this.clara = React.createRef();
    // this.canvas = React.createRef();
    this.state = {
      activeIndex: null,
      items: [],
      clara: clara
    };
  }

  handleClick(id) {
    importSceneId = id;
    importScene();
  }

  componentDidMount() {
    const itemsRef = this.props.firebase.database.ref("itemImg");
    document.querySelector("#nav02").classList.remove("activeNav");
    document.querySelector("#nav01").classList.remove("activeNav");
    document.querySelector("#nav03").classList.add("activeNav");
    document.querySelector("#nav04").classList.remove("activeNav");
    itemsRef.on("value", snapshot => {
      let furnitures = snapshot.val();
      let newState = [];

      for (let item in furnitures) {
        var furni = furnitures[item];
        for (let i in furni) {
          newState.push({
            name: i,
            itemName: furni[i].name,
            id: furni[i].id,
            img: furni[i].img,
            price: furni[i].price,
            demension: furni[i].demension,
            buy: furni[i].buy
          });
        }
      }
      let claraContainerRef = this.refs.ref1;
      clara = claraService.claraplayer(claraContainerRef);

      //var api = claraplayer('player');
      THREE = clara.deps.THREE;
      var rotate = "";
      var opts = {
        displayGizmo: false,
        mode: "plane",
        plane: { normal: { x: 0, y: 1, z: 0 }, constant: 0 }
      };
      clara.player.setProgressBar("line");
      //This function is for moving object
      sceneId = window.sced;
      clara.sceneIO.fetchAndUse(sceneId).then(function() {
        clara.player.showTool("nodeMove");
        clara.player.removeTool("select");
        clara.selection.setHighlighting(true);

        clara.commands.addCommand({
          enabled: true,
          active: true,
          tool: {
            click: function(ev) {
              var selectId = clara.player.filterNodesFromPosition(ev);
              console.log(selectId);
              groupId = findParentGroupId(selectId[0]);
              mouseID = JSON.stringify(groupId);
              if (!selectId || !groupId) {
                clara.selection.deselectAll();
                clara.commands.activateCommand("orbit");
              } else {
                clara.selection.selectNode(groupId);
                console.log("this is object id: ", groupId);
                clara.commands.activateCommand("nodeMove");
                opts.onChange = updateAttachPointPosition(groupId);
                clara.commands.setCommandOptions("nodeMove", opts);
              }
            }
          }
        });
      });

      this.setState({
        items: newState,
        clara: clara
      });
    });

    $("#menu").metisMenu({
      toggle: false
    });
  }

  handleClickToggle = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;

    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  getListFuniture() {
    result = this.state.items;
    for (var i in result) {
      if (result[i].name.includes("bed")) {
        bed.push(result[i]);
      } else if (result[i].name.includes("sofa")) {
        sofa.push(result[i]);
      } else if (result[i].name.includes("kit")) {
        kit.push(result[i]);
      } else if (result[i].name.includes("chair")) {
        chair.push(result[i]);
      }
    }
  }

  bedList = () => {
    bed = [];
    result = this.state.items;
    for (var i in result) {
      if (result[i].name.includes("bed")) {
        bed.push(result[i]);
      }
    }

    var count = 0;
    return bed.map(data => {
      if (count > 2) {
        count = 0;
        return <tr />;
      }
      count++;
      return (
        <td>
          <Popup
            trigger={
              <Image
                alt={data.id}
                className="funitureImage"
                src={data.img}
                onClick={e => this.handleClick(data.id)}
                style={{ padding: "5px", margin: "5px" }}
                thumbnail
              />
            }
            position="left"
            on="hover"
          >
            <FunitureDetail funiture={data} />
          </Popup>{" "}
        </td>
      );
    });
  };

  chairList = () => {
    chair = [];
    result = this.state.items;
    for (var i in result) {
      if (result[i].name.includes("chair")) {
        chair.push(result[i]);
      }
    }

    var count = 0;
    return chair.map(data => {
      if (count > 2) {
        count = 0;
        return <tr />;
      }
      count++;
      return (
        <td>
          <Popup
            trigger={
              <Image
                alt={data.id}
                className="funitureImage"
                src={data.img}
                onClick={e => this.handleClick(data.id)}
                style={{ padding: "5px", margin: "5px" }}
                thumbnail
              />
            }
            position="left"
            on="hover"
          >
            <FunitureDetail funiture={data} />
          </Popup>{" "}
        </td>
      );
    });
  };

  sofaList = () => {
    sofa = [];
    result = this.state.items;
    for (var i in result) {
      if (result[i].name.includes("sofa")) {
        sofa.push(result[i]);
      }
    }

    var count = 0;
    return sofa.map(data => {
      if (count > 2) {
        count = 0;
        return <tr />;
      }
      count++;
      return (
        <td>
          <Popup
            trigger={
              <Image
                alt={data.id}
                className="funitureImage"
                src={data.img}
                onClick={e => this.handleClick(data.id)}
                style={{ padding: "5px", margin: "5px" }}
                thumbnail
              />
            }
            position="left"
            on="hover"
          >
            <FunitureDetail funiture={data} />
          </Popup>{" "}
        </td>
      );
    });
  };

  kitList = () => {
    kit = [];
    result = this.state.items;
    for (var i in result) {
      if (result[i].name.includes("kit")) {
        kit.push(result[i]);
      }
    }

    var count = 0;
    return kit.map(data => {
      if (count > 2) {
        count = 0;
        return <tr />;
      }
      count++;
      return (
        <td>
          <Popup
            trigger={
              <Image
                alt={data.id}
                className="funitureImage"
                src={data.img}
                onClick={e => this.handleClick(data.id)}
                style={{ padding: "5px", margin: "5px" }}
                thumbnail
              />
            }
            position="left"
            on="hover"
          >
            <FunitureDetail funiture={data} />
          </Popup>{" "}
        </td>
      );
    });
  };

  //save

  render() {
    const { activeIndex } = this.state;

    return (
      <div className="DrapFunitures">
        <NavBar />
        <Container style={{ padding: "10px", margin: "0px" }} fluid="true">
          <Row>
            <Col
              className="renderHouse1"
              md={9}
              style={{
                width: "70vw",
                height: "80vh",
                border: "0px solid  #bdc3c7"
              }}
              ref="ref1"
            >
              <h1>Clara Player</h1>
              <div className="groudButton">
                <Button
                  className="btn"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    importScene();
                  }}
                >
                  Import
                </Button>
                <Button
                  className="btn"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    rotateFunc();
                  }}
                >
                  Rotate
                </Button>
                <Button
                  className="btn"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    scaleFunc();
                  }}
                >
                  Scale
                </Button>
                <Button
                  className="btn"
                  variant="primary"
                  type="button"
                  onClick={() => {
                    clearScene();
                  }}
                >
                  Delete
                </Button>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    saveRender();
                  }}
                >
                  Download
                </Button>
              </div>
            </Col>

            <Col
              className="ListFuniture"
              md={3}
              style={{ padding: "10px", border: "2px solid #4FA9DB" }}
            >
              <div className="funitureFeature">
                <Accordion>
                  <Accordion.Title
                    active={activeIndex === 0}
                    index={0}
                    onClick={this.handleClickToggle}
                  >
                    <p className="itemFuniture">
                      <FontAwesomeIcon icon={faBed} className="icon" />
                    </p>
                    <span className="itemFuniture">Bed</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                    {this.bedList()}
                  </Accordion.Content>

                  <Accordion.Title
                    active={activeIndex === 1}
                    index={1}
                    onClick={this.handleClickToggle}
                  >
                    <p className="itemFuniture">
                      <FontAwesomeIcon icon={faChair} className="icon" />
                    </p>
                    <span className="itemFuniture">Chair</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 1}>
                    {this.chairList()}
                  </Accordion.Content>

                  <Accordion.Title
                    active={activeIndex === 2}
                    index={2}
                    onClick={this.handleClickToggle}
                  >
                    <p className="itemFuniture">
                      <FontAwesomeIcon icon={faCouch} className="icon" />
                    </p>
                    <span className="itemFuniture">Sofa</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 2}>
                    {this.sofaList()}
                  </Accordion.Content>
                  <Accordion.Title
                    active={activeIndex === 3}
                    index={3}
                    onClick={this.handleClickToggle}
                  >
                    <p className="itemFuniture">
                      <FontAwesomeIcon icon={faArchway} className="icon" />
                    </p>
                    <span className="itemFuniture">Kitchen</span>
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 3}>
                    {this.kitList()}
                  </Accordion.Content>
                </Accordion>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function updateAttachPointPosition(groupId) {
  attachPointLocation[groupId] = {};
  var pointIds = groupIdAttachIdsMap[groupId];
  if (pointIds) {
    pointIds.forEach(function(id) {
      var transformInfo = clara.scene.getWorldTransform(id);
      attachPointLocation[groupId][
        id
      ] = new THREE.Vector3().setFromMatrixPosition(transformInfo);
    });
  }
}

function importScene() {
  // dong nay labac buoc phai co, tai no copy cai scene cua minh bang id, roi tao mot scene moi.
  clara.sceneIO.fetch(importSceneId).then(function() {
    // dong nay tao cai id moi co cai scene minh moi copy
    var newObjectsIds = clara.scene.find({
      from: { id: importSceneId },
      name: "Objects"
    });
    //code de copy cai scene
    clara.scene
      .clone(
        { from: { id: newObjectsIds }, type: ["PolyMesh", "Null"] },
        { withNull: "Import Null", includeDependencies: true }
      )
      .then(function(nodeMap) {
        clara.scene.set(
          //cai nay set position cho cai scene luc minh add vao
          {
            id: nodeMap["Import Null"],
            plug: "Transform",
            property: "translation"
          },
          { x: 0.12, y: 0, z: -0.12 } //y: numImports++ / 2
        );
      });
    clara.scene.find({ name: "Objects" }).name = "BoxGroup";
  });
}
function findParentGroupId(selectId) {
  var groupId = selectId;
  var nodeName = clara.scene.get({ id: groupId, property: "name" });
  while (nodeName !== "BoxGroup") {
    if (!nodeName) return null;
    groupId = clara.scene.find({ id: groupId, parent: true });
    nodeName = clara.scene.get({ id: groupId, property: "name" });
  }
  return groupId;
}

function scaleFunc() {
  clara.commands.activateCommand("nodeScale");
}

function saveRender() {
  var id = clara.scene.find({ name: "Objects" });
  clara.commands.setCommandOptions("snapshot", {
    dataType: "download image",
    camera: "default",
    width: 1000,
    height: 800
  });
  var items = clara.commands.runCommand("snapshot");
  if (items) {
    var resultImage = document.getElementById("resultImage");
    resultImage.src = URL.createObjectURL(items);
  }
}

function rand(to, from) {
  return Math.floor(Math.random() * from + to);
}

//this method adding object to the scene

//this method delete the object from the scene. All object have to be name: BoxGroup
function clearScene() {
  clara.sceneGraph.deleteNode(mouseID.substring(1, mouseID.length - 1));
}

//This function helps rotating object. Need to improve the performance of this function.
function rotateFunc() {
  clara.commands.activateCommand("nodeRotate");
}

//this function helps to scale the objects

export default withFirebase(RenderRoom);
