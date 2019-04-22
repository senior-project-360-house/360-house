import React, { Component } from 'react';
import {idScence} from './index.js';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {withFirebase} from '../../server/Firebase/index';
import $ from 'jquery';
import MetisMenu from 'metismenu/src';
import './clara.css';
import {Button} from "reactstrap";
import claraService from "./Clara";
import {ClaraPlayer} from "./ClaraPlayer";
import sced from './utils';

let clara;

let sceneId =  "921754c6-d081-4e97-af23-178124591393";
//clara.sceneIO.fetchAndUse(sceneId);
let importSceneId = 'f85ef7a2-6aaa-4333-ba69-1e8f121c4706';
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

class Menu extends Component {
	constructor(props) {
		super(props);
		this.clara = React.createRef();
		this.canvas = React.createRef();
    this.state = {
      items: [],
      clara: clara
    }
	}

      handleClick(id){
        importSceneId = id;
        importScene();
     }

     componentDidMount() {
         const itemsRef  = this.props.firebase.database.ref('itemImg');

         itemsRef.on('value', (snapshot) => {
           var result: [];
           let furnitures = snapshot.val();
           let newState = [];

           for (let item in furnitures) {
             var furni = furnitures[item];
             for(let i in furni){
               newState.push({
                 name: i,
                 id: furni[i].id,
                 img: furni[i].img
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
             mode: 'plane',
             plane: {normal: {x: 0, y: 1, z: 0}, constant: 0},
           }
           clara.player.setProgressBar('line');
        //This function is for moving object
				console.log(window.sced);
				sceneId = window.sced;
         clara.sceneIO.fetchAndUse(sceneId).then(function() {

           clara.player.showTool('nodeMove');
           clara.player.removeTool('select');
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
                  clara.commands.activateCommand('orbit');
                } else {
                  clara.selection.selectNode(groupId);
                  console.log('this is object id: ', groupId);
                  clara.commands.activateCommand('nodeMove');
                  opts.onChange = updateAttachPointPosition(groupId);
                  clara.commands.setCommandOptions('nodeMove', opts);
                }
              },
            },
          });
        });

           this.setState({
             items: newState,
             clara: clara
           });
         });

         $('#menu').metisMenu({
           toggle: false
         });


       }




	//save


    render() {
      result = this.state.items;
      for(var i in result){
        if(result[i].name.includes("bed")){
          bed.push(result[i]);
        }else if(result[i].name.includes("sofa")){
          sofa.push(result[i]);
        }else if(result[i].name.includes("kit")){
          kit.push(result[i]);
        }else if(result[i].name.includes("chair")){
          chair.push(result[i]);
        }
      }
      var count = 0;
      var cha = 0;
      var sof = 0;
      var ki = 0;
      return (
        <Container>
        <Row>
        <Col>
        				<h1>Home Page</h1>
        				<div
        					id="container"
        					style={{width: "800px", height: "600px"}}
        					ref="ref1"
        				/>
        				<Button className="btn"
        					variant="primary"
        					type="button"
        					onClick={() => {
        						importScene();
        					}}
        				>
        					Import
        				</Button>
        				<Button className="btn"
        					variant="primary"
        					type="button"
        					onClick={() => {
        						rotateFunc();
        					}}
        				>
        					Rotate
        				</Button>

        				<Button className="btn"
        					variant="primary"
        					type="button"
        					onClick={() => {
        						scaleFunc();
        					}}
        				>
        					Scale
        				</Button>

        				<Button className="btn"
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

        			</Col>
              <Col>
              </Col>


        <Col>
        <h1>This is a demo</h1>
        <br/>
        <br/>
        <div className="row">
          <div className="col-xs-6">
            <aside className="sidebar">
              <nav className="sidebar-nav">
                <ul className="metismenu" id="menu">
                  <li>
                    <a href="#" aria-expanded="false">Bed <span className="fa arrow" /></a>
                    <ul aria-expanded="false">
                    <table maxColumns={3} aria-expanded="true">
                      {
                        bed.map(data => {
                        if(count > 2){
                          count = 0;
                          return <tr></tr>
                        }
                        count++;
                        return <td> <img src={data.img}  onClick={(e) => this.handleClick(data.id)} width={50} height={50}/></td>
                      })}
                    </table>
                    </ul>
                  </li>
                  <li>
                    <a href="#" aria-expanded="false">Chair <span className="fa arrow" /></a>
                    <ul aria-expanded="false">
                    <table maxColumns={3} aria-expanded="true">
                      {
                        chair.map(data => {
                        if(cha > 2){
                          cha = 0;
                          return <tr></tr>
                        }
                        cha++;
                        return <td> <img src={data.img}  onClick={(e) => this.handleClick(data.id)} width={50} height={50}/></td>
                      })}
                    </table>
                    </ul>
                  </li>
                  <li>
                    <a href="#" aria-expanded="false">Sofa <span className="fa arrow" /></a>
                    <ul aria-expanded="false">
                    <table maxColumns={3} aria-expanded="true">
                      {
                        sofa.map(data => {
                        if(sof > 2){
                          sof = 0;
                          return <tr></tr>
                        }
                        sof++;
                        return <td> <img src={data.img}  onClick={(e) => this.handleClick(data.id)} width={50} height={50}/></td>
                      })}
                    </table>
                    </ul>
                  </li>
                  <li>
                    <a href="#" aria-expanded="false">Kitchen <span className="fa arrow" /></a>
                    <ul aria-expanded="false">
                    <table maxColumns={3} aria-expanded="true">
                      {
                        kit.map(data => {
                        if(ki > 2){
                          ki = 0;
                          return <tr></tr>
                        }
                        ki++;
                        return <td> <img src={data.img}  onClick={(e) => this.handleClick(data.id)} width={50} height={50}/></td>
                      })}
                    </table>
                    </ul>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>
        </div>
        </Col>
        </Row>
        </Container>
      );
    }
  }

function updateAttachPointPosition(groupId){
  attachPointLocation[groupId] = {};
  var pointIds = groupIdAttachIdsMap[groupId];
  if (pointIds) {
    pointIds.forEach(function(id){
      var transformInfo = clara.scene.getWorldTransform(id);
      attachPointLocation[groupId][id] = new THREE.Vector3().setFromMatrixPosition(transformInfo);
    });
  }
};

function importScene() {
	// dong nay labac buoc phai co, tai no copy cai scene cua minh bang id, roi tao mot scene moi.
	clara.sceneIO.fetch(importSceneId).then(function() {
	// dong nay tao cai id moi co cai scene minh moi copy
	var newObjectsIds = clara.scene.find({ from: { id: importSceneId }, name: 'Objects' });
	//code de copy cai scene
	clara.scene.clone(
		{ from: { id: newObjectsIds }, type: ['PolyMesh', 'Null'] },
		{ withNull: 'Import Null', includeDependencies: true }
	).then(function(nodeMap) {
			clara.scene.set(
				//cai nay set position cho cai scene luc minh add vao
				{ id: nodeMap['Import Null'], plug: 'Transform', property: 'translation' },
				{x: 0.12, y: 0, z: -0.12} //y: numImports++ / 2
			);
		});
		clara.scene.find({name:'Objects'}).name = 'BoxGroup';
	});
}
function findParentGroupId(selectId){
  var groupId = selectId;
  var nodeName = clara.scene.get({id: groupId, property: 'name'});
  while ( nodeName !== 'BoxGroup' ){

    if (!nodeName) return null;
    groupId = clara.scene.find({id: groupId, parent: true});
    nodeName = clara.scene.get({id: groupId, property: 'name'});
  }
  return groupId;
};

function scaleFunc() {
		clara.commands.activateCommand('nodeScale');
}

function saveRender() {
	  var id  = clara.scene.find({name:'Objects'});
	  clara.commands.setCommandOptions('snapshot', {
	    dataType: 'download image',
	    camera: 'default',
	    width: 1000,
	    height: 800,
	  });
	  var items = clara.commands.runCommand('snapshot');
	  if (items) {
	    var resultImage = document.getElementById('resultImage');
	    resultImage.src = URL.createObjectURL(items);
	  }
	}

	function rand(to, from) {
	  return Math.floor((Math.random() * from) + to);
	}

	//this method adding object to the scene

	//this method delete the object from the scene. All object have to be name: BoxGroup
	function clearScene() {
	  clara.sceneGraph.deleteNode(mouseID.substring(1,mouseID.length -1 ));
	}

	//This function helps rotating object. Need to improve the performance of this function.
	function rotateFunc() {
	    clara.commands.activateCommand('nodeRotate');
	}

	//this function helps to scale the objects




export default withFirebase(Menu);
