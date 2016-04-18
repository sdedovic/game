var time = require ( './utility/request_time' );
var spawn = require ( './utility/spawn' );

var updateLoopAbstract = Object.create ( Object.prototype, {
  timestep : {},
  limit : {},
  update : {},
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
    if ( ! this.started ) {
      this.started = true;
      this.timer = time.requestTimeslot ( function ( timestamp ) {
        this.running = true;
        this.laststamp = timestamp;
        this.timer = time.requestTimeslot ( this.loop.bind ( this ), this.timestep );
      }.bind ( this ), this.timestep );
    }
  },

  loop : function ( timestamp ) {
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
    this.timer = time.requestTimeslot ( this.loop.bind ( this ), this.timestep );
  },
} );

exports.updateLoop = updateLoop;
