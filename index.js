var app = require ( 'express' ) ();
var http = require ( 'http' ).Server ( app );
var io = require ( 'socket.io' ) ( http );

var cookies = 100;

app.get ( '/', function ( req, res ) {
	res.sendFile ( __dirname + '/index.html' );
});

io.on ( 'connection', function ( socket ) {
	socket.on ( 'request cookie', function (  ) {
		if ( cookies > 0 ) {
			cookies--;
			io.emit ( 'update', { cookies: cookies } );
		} else {
			io.emit ( 'update', { cookies: cookies, error: 'out of cookies' } );
		}
	} );
} );

setInterval ( function () {
	io.emit ( 'update', { cookies: cookies } );
}, delay = 1000 );

http.listen ( 3000, function () {
	console.log ( 'server on, port 3000' );
} );
