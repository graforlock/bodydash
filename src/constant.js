function Constant(x)
{
    return new Constant_(x);
}

function Constant_(x)
{
    this.__value = x;
}

Constant_.prototype.map = function() {
    return new Constant(this.__value);
};

module.exports = Constant;