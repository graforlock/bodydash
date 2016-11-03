//--->> Right

function Right(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
};

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
};

module.exports = Right;
