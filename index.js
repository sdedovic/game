var app = require ('express') ();
var http = require ('http').Server (app);
var io = require ('socket.io') (http);

var tick = require ( './tick' );
var util = require ( './utility/util' );

var Player = require('./models/player');
var World = require('./models/world');
var Farm = require('./models/cookie');


app.get ('/', function(req, res) {
	  res.sendFile (__dirname + '/index.html');
});

http.listen (3000, function () {
	  console.log ('server on, port 3000');

    var farm = new Farm(5000);
    var world = new World(farm);

    setInterval(function() {
        world.update(500);
    }, 500);

    io.on ('connection', function(socket) {
        world.players.push(new Player(socket, farm));
    });
});
