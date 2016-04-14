module.exports = requestTimeslot;

if ( ! Date.now () ) {
	Date.now = function () {
		return new Date ().getTime ();
	};
}

var requestTimeslot = function () {
	var timeLast = Date.now ();

	return function ( callback ) {
		var timeNow = Date.now (),
				delta = timeNow - timeLast,
				timeout = ( timestep > delta ) ? ( timestep - delta ) : 0;

		timeLast = timeNow + timeout;

		return setTimeout ( function () {
			callback ( timeNow + timeout );
		}, timeout );
	};
} ();

var cancelTimeslot = clearTimeout;
