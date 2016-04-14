var Ainterface = Object.create ( Object.prototype, {
  x : { 
    value : undefined,
    configurable : false,
    writable : false,
  },
  f : { 
    value : undefined,
    configurable : false,
    writable : false,
  }
} );

var A = Object.create ( Ainterface, { 
  y : { value : function () {
    return this.f ();
  } },
} );

var C = function ( z ) {
  this.z = z;
};

C.prototype.g = function () {
  console.log ( this.z );
};

var c = new C ( 5 );

var B = Object.create ( A, {
  x : { value : 5 },
  f : { value : function () {
    return this.x * 2;
  } },
  g : c.g.bind ( c ),
} );

console.log ( B.f () );
B.g ();
