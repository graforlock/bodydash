//--->> Left

function Left(x) {
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
};

Left.prototype.map = function(f) {
    return this;
};

module.exports = Left;