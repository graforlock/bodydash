//--->> Either
var utils = require('./utils');

function Left(x) {
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
};

Left.prototype.map = function(f) {
    return this;
};

function Right(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
};

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
};

module.exports = utils.curry(function(f /* identity in mose cases */, g, e) {
     switch (e.constructor) { 
        case Left: return f(e.__value); 
        case Right: return g(e.__value); 
    } 
});