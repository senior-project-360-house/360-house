// var sceneId = '6670cc41-f0f1-48c5-b343-21e103a359fd';
var sceneId = '921754c6-d081-4e97-af23-178124591393';
var importSceneId = 'f85ef7a2-6aaa-4333-ba69-1e8f121c4706';
var groupIdAttachIdsMap = {};
var attachPointLocation = {};
var root = firebase.database().ref();
var table = document.getElementById("menu-table");
var row = document.getElementById("menu-row");
var api = claraplayer('player');
var THREE = api.deps.THREE;
var mouseID = "";
var opts = {
  displayGizmo: false,
  mode: 'plane',
  plane: {
    normal: {
      x: 0,
      y: 1,
      z: 0
    },
    constant: 0
  },
}
api.player.setProgressBar('line');
//This function is for moving object
api.sceneIO.fetchAndUse(sceneId).then(function () {
  api.player.showTool('nodeMove');
  api.player.removeTool('select');
  api.selection.setHighlighting(true);

  api.commands.addCommand({
    enabled: true,
    active: true,
    tool: {
      click: function (ev) {
        var selectId = api.player.filterNodesFromPosition(ev);
        var groupId = findParentGroupId(selectId[0]);
        mouseID = JSON.stringify(groupId);
        if (!selectId || !groupId) {
          api.selection.deselectAll();
          api.commands.activateCommand('orbit');
        } else {
          api.selection.selectNode(groupId);
          console.log('this is object id: ', groupId);
          api.commands.activateCommand('nodeMove');
          opts.onChange = updateAttachPointPosition(groupId);
          api.commands.setCommandOptions('nodeMove', opts);
        }
      },
    },
  });
});


//this function is to add html elements
function appendHtml(el, str) {
  var div = document.createElement('div');
  div.innerHTML = str;
  while (div.children.length > 0) {
    el.appendChild(div.children[0]);
  }
}



//this function is for updating object
function updateAttachPointPosition(groupId) {
  attachPointLocation[groupId] = {};
  var pointIds = groupIdAttachIdsMap[groupId];
  if (pointIds) {
    pointIds.forEach(function (id) {
      var transformInfo = api.scene.getWorldTransform(id);
      attachPointLocation[groupId][id] = new THREE.Vector3().setFromMatrixPosition(transformInfo);
    });
  }
};

//this method using to find the entire object
function findParentGroupId(selectId) {
  var groupId = selectId;
  var nodeName = api.scene.get({
    id: groupId,
    property: 'name'
  });
  while (nodeName !== 'BoxGroup') {

    if (!nodeName) return null;
    groupId = api.scene.find({
      id: groupId,
      parent: true
    });
    nodeName = api.scene.get({
      id: groupId,
      property: 'name'
    });
  }
  return groupId;
};

// //this method providing random position of added object. We will change it later
// function rand(to, from) {
//   return Math.floor((Math.random() * from) + to);
// }

// //this method adding object to the scene
// function importScene() {
//   // dong nay labac buoc phai co, tai no copy cai scene cua minh bang id, roi tao mot scene moi.
//   api.sceneIO.fetch(importSceneId).then(function() {
//   // dong nay tao cai id moi co cai scene minh moi copy
//   var newObjectsIds = api.scene.find({ from: { id: importSceneId }, name: 'Objects' });
//   //code de copy cai scene
//   api.scene.clone(
//     { from: { id: newObjectsIds }, type: ['PolyMesh', 'Null'] },
//     { withNull: 'Import Null', includeDependencies: true }
//   ).then(function(nodeMap) {
//       api.scene.set(
//         //cai nay set position cho cai scene luc minh add vao
//         { id: nodeMap['Import Null'], plug: 'Transform', property: 'translation' },
//         {x: 0.12, y: 0, z: -0.12} //y: numImports++ / 2
//       );
//     });
//     api.scene.find({name:'Objects'}).name = 'BoxGroup';
//   });


// };

// //this method delete the object from the scene. All object have to be name: BoxGroup
// function clearScene() {
//   api.sceneGraph.deleteNode(mouseID.substring(1,mouseID.length -1 ));
// };

// //This function helps rotating object. Need to improve the performance of this function.
// function rotateFunc() {
//   return function(ev) {
//     api.commands.activateCommand('nodeRotate');
//   };
// }

// //this function helps to scale the objects
// function scaleFunc() {
//   return function(ev) {
//     api.commands.activateCommand('nodeScale');
//   };
// }


// //save
// function saveRender() {

//   // curl "https://clara.io/api/scenes/42a35cc6-bce7-48b4-a8b9-af9c1812b3c4/publish?wait=false" \
//   // -d pin=true
//   // -u username:2de09431-6b1a-488f-a9a6-feda649864bd \
//   // -X POST
//   var id  = api.scene.find({name:'Objects'});
//   console.log('this is scene id ',id);


//   api.commands.setCommandOptions('snapshot', {
//     dataType: 'blob',
//     camera: 'default',
//     width: 1000,
//     height: 800,
//   });
//   var result = api.commands.runCommand('snapshot');
//   if (result) {
//     var resultImage = document.getElementById('resultImage');
//     resultImage.src = URL.createObjectURL(result);
//   }
// }