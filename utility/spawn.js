Object.spawn = function ( parent, props ) {
  var defs = {}, key;
  for ( key in props ) {
    if ( props.hasOwnProperty ( key ) ) {
      defs [ key ] = {
        value : props [ key ],
        writable : true,
        configurable : true,
        enumerable : true,
      };
    }
  }
  return Object.create ( parent, defs );
};

module.exports = Object.spawn;
