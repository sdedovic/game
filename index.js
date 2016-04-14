var app = require ('express') ();
var http = require ('http').Server (app);
var io = require ('socket.io') (http);

var tick = require ( './tick' );

var Player = require('./models/player');
var World = require('./models/world');


app.get ('/', function(req, res) {
	  res.sendFile (__dirname + '/index.html');
});

http.listen (3000, function () {
	  console.log ('server on, port 3000');

    var world = new World();

		var worldLoop = Object.create ( tick.updateLoop, {
			timestep : 1000,
			limit : 60,
			update : world.update,
}	);

/*
    setInterval(function() {
        world.update(500);
    }, 500);
*/

    io.on ('connection', function(socket) {
        var player = new Player(socket, world);
        world.connect(player);
    });
});
