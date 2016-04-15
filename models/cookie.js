var Cookies = function(count) {
    this.count = count;
};

Cookies.prototype.mine = function(num) {
    var toMine = Math.floor(num);
    var mined = 0;
    if (toMine > this.count){
        mined = this.count;
        this.count = 0;
    } else {
        mined = toMine;
        this.count -= toMine;
    }
    return mined;
};

module.exports = Cookies;
