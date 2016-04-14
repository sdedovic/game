var time = require ( './utility/request_time' );
var util = require ( './utility/util' );

var updateLoopAbstract = Object.create ( Object.prototype, {

	timestep : {
		configurable : false,
		writable : false, 
		value : undefined,
	},

	limit : {
		configurable : false,
		writable : false, 
		value : undefined,
	},

	update : {
		configurable: false,
		writable: false,
		value : undefined,
	},

} );

var updateLoop = Object.spawn ( updateLoopAbstract, {

  laststamp : { value : 0 },
	delta : 0,
	timer : 0,
	running : false,
	started : false,

	stop : function () {
		running = false;
		started = false;
		cancelTimeslot ( timer );
	},

	start : function () {
		if ( ! started ) {
			started = true;
			timer = requestTimeslot ( function ( timestamp ) {
				running = true;
				laststamp = timestamp;
				timer = requestTimeslot ( loop );
			} );
		}
	},

	loop : function ( timestamp ) {
		delta += timestamp - laststamp;
		laststamp = timestamp;

		var tries = 0;
		while ( delta >= timestep ) {
			update ( timestep );
			delta -= timestep;
			if ( ++tries >= limit ) {
				delta = 0;
				break;
			}
		}
		timer = time.requestTimeslot ( loop );
	},
} );

module.exports = updateLoop;
