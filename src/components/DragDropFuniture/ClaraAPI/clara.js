import claraplayer from "clara";

var clara = require("clara")({
  apiToken: "bf89792d-1e2e-442c-a08b-78d720d975db",
  username: "mlucario"
});

var claraP = claraplayer("clara-embed");

clara.scenes
  .list()
  .then(function(scenes) {})
  .catch(function(err) {});
