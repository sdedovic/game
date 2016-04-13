var Player = function(socket, world) {
    this.socket = socket;
    this.world = world;
    this.cookies = 0;

    var self = this;

    this.socket.on('action', function(msg) {
        if (msg.mine.cookie) {
            var numMined = self.world.cookies.mine(1);
            self.cookies += numMined;
        }
    });
};

Player.prototype.update = function(delta) {
    // PASS
};

module.exports = Player;
