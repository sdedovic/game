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

  laststamp : 0,
	delta : 0,
	timer : 0,
	running : false,
	started : false,

	stop : function () {
		this.running = false;
		this.started = false;
		this.cancelTimeslot ( this.timer );
	},

	start : function () {
    console.log ( "called start\nprototype is" );
    console.log ( Object.getPrototypeOf ( this ) === updateLoop );
    
		if ( ! this.started ) {
			this.started = true;
			this.timer = time.requestTimeslot ( function ( timestamp ) {
				this.running = true;
				this.laststamp = timestamp;
				this.timer = time.requestTimeslot ( this.loop.bind ( this ) );
			}.bind ( this ) );
		}
	},

	loop : function ( timestamp ) {
    console.log ( "called loop\nprototype is" );
    console.log ( Object.getPrototypeOf ( this ) === updateLoop );

		this.delta += timestamp - this.laststamp;
		this.laststamp = timestamp;

		var tries = 0;
		while ( this.delta >= this.timestep ) {
			this.update ( this.timestep );
			this.delta -= this.timestep;
			if ( ++tries >= this.limit ) {
				this.delta = 0;
				break;
			}
		}
		this.timer = time.requestTimeslot ( this.loop.bind ( this ) );
	},
} );

exports.updateLoop = updateLoop;
