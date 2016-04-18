var app = require ('express') ();
var http = require ('http').Server (app);
var io = require ('socket.io') (http);

var tick = require ( './tick' );
var spawn = require ( './utility/spawn' );

var Player = require('./models/player');
var World = require('./models/world');


app.get ('/', function(req, res) {
  res.sendFile (__dirname + '/index.html');
});

http.listen (3000, function () {
  console.log ('server on, port 3000');

  var world = new World();

  var worldLoop = Object.spawn ( tick.updateLoop, {
    timestep : 1000,
    limit : 0,
    update : world.update.bind ( world ),
  } );

  worldLoop.start ();

  io.on ('connection', function(socket) {
    var player = new Player(socket, world);
    world.connect(player);
  });
});
