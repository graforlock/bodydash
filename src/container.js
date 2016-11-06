//-->>> Container

function Container(x)
{
    this.__value = x;
}

Container.of = function (x)
{
    return new Container(x);
};

Container.prototype.map = function (f)
{
    return Container.of(f(this.__value));
};

Container.prototype.ap = function (other)
{
    return other.map(this.__value);
};

Container.prototype.join = function()
{
    return this.__value;
};


module.exports = Container;
