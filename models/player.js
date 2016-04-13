var Player = function(name, socket){
    this.name = name;
    this.socket = socket;

    this.cookies = 0;
};

module.exports = Player;
