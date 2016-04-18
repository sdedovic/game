if ( ! Date.now () ) {
	Date.now = function () {
		return new Date ().getTime ();
	};
}

var requestTimeslot = function () {
	var laststamp = Date.now ();

	return function ( callback, timestep ) {
		var timestamp = Date.now (),
				delta = timestamp - laststamp,
				timeout = ( timestep > delta ) ? ( timestep - delta ) : 0;

		laststamp = timestamp + timeout;

		return setTimeout ( function () {
			callback ( timestamp + timeout );
		}, timeout );
	};
} ();

var cancelTimeslot = clearTimeout;

exports.requestTimeslot = requestTimeslot;
