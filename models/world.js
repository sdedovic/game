var util = require('util');

var CookieFarm = require('./cookie');

var World = function(farm){
    this.farm = farm;

    this.players = [];
};

World.prototype.update = function(delta){
    var world = this;
    this.players.forEach(function(player){
        player.update(delta);
        var returnObj = {
            world: {
                farm: world.farm,
                players: world.players.map(function(player) {
                    return {cookies: player.cookies, grandmas: player.grandmas};
                })
            },
            self: {
                cookies: player.cookies,
                grandmas: player.grandmas
            }
        };
        player.socket.emit('update', returnObj);
    });
};

module.exports = World;
