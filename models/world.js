var CookieFarm = require('./cookie');

var World = function(){
    this.players = [];
    this.cookies = new CookieFarm(450);
};

World.prototype.connect = function(player) {
    this.players.push(player);
};

World.prototype.update = function(delta){
    this.players.forEach(function(player){
        player.update(delta);
    });
};

module.exports = World;
