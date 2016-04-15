var LasAbuelas = require('./npcgroup');

var Player = function(socket, farm) {
    this.socket = socket;
    this.farm = farm;

    this.cookies = 0;
    this.grandmas = new LasAbuelas(farm);

    var self = this;

    this.socket.on('action', function(msg) {
        if (msg.mine && msg.mine.cookie) {
            self.cookies += self.farm.mine(1);
        }
        if (msg.buy && msg.buy.grandma) {
            if (self.cookies >= LasAbuelas.COST) {
                self.cookies -= LasAbuelas.COST;
                self.grandmas.count++;
            }
        }
    });
};

Player.prototype.update = function(delta) {
    this.grandmas.update(delta);
    this.cookies += this.grandmas.takeCookies();
};

module.exports = Player;
