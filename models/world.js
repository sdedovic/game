var CookieFarm = require('./cookie');

var World = function(){
    this.players = [];
    this.cookies = new CookieFarm(450);
};

World.prototype.connect = function(player) {
    this.players.push(player);
};

World.prototype.update = function(delta){
    var state = {world: {cookies: this.cookies.count}};

    this.players.forEach(function(player){
        player.update(delta);

        state.player =  {cookies: player.cookies};
        player.socket.emit('update', state);
    });
};

module.exports = World;
