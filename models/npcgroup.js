var LasAbuelas = function(farm) {
    this.farm = farm;

    this.count = 0;
    this.rate = 1;
    this.productionAt = 0;
    this.cookies = 0;
};

LasAbuelas.COST = 5;

LasAbuelas.prototype.takeCookies = function() {
    var amount = this.cookies;
    this.cookies = 0;
    return amount;
};

LasAbuelas.prototype.update = function(delta) {
    this.productionAt += this.count * this.rate * (delta / 1000);
    var mined = this.farm.mine(this.productionAt);
    this.cookies += mined;
    // if cookies run out productionAt is unbound and can overflow
    this.productionAt -= mined;
};

module.exports = LasAbuelas;
