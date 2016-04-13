var Cookies = function(count) {
    this.count = count;
};

Cookies.prototype.mine = function(num) {
    var mined;
    if (num > this.count){
        mined = this.count;
        this.count = 0;
    } else {
        mined = num;
        this.count -= num;
    }
    console.log(this.count)
    return mined;
};

module.exports = Cookies;
