var app = require ( 'express' ) ();
var http = require ( 'http' ).Server ( app );
var io = require ( 'socket.io' ) ( http );

var Player = require('./models/player');

var cookies = 100;
var players = [];

app.get ( '/', function ( req, res ) {
	  res.sendFile ( __dirname + '/index.html' );
});

io.on ( 'connection', function ( socket ) {
    var player = new Player("Player: " + players.length, socket);
    socket.on ( 'request cookie', function (  ) {
		    if ( cookies > 0 ) {
			      cookies--;
            player.cookies++;
			      io.emit ( 'update-player', { cookies: player.cookies } );
		    } else {
			      io.emit ( 'update-player', { cookies: player.cookies, error: 'out of cookies' } );
		    }
	  } );
} );

setInterval ( function () {
	  io.emit ( 'update-world', { cookies: cookies } );
}, delay = 1000 );

http.listen ( 3000, function () {
	  console.log ( 'server on, port 3000' );
} );
