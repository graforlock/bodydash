//--->>> Lazy Sequence
var compose = require('./core').compose,
    func = require('./contracts').func,
    curry = require('./curry');

function Seq(f)
{
    f = func(f);
    this.__value = f;
    this.take = curry(function (num, f)
    {
        var list = [];
        for (var i = 1; i <= num; i++)
        {
            list.push(f);
        }
        return new Seq(function ()
        {
            return compose.apply(null, list)(this.__value());
        }.bind(this));
    }.bind(this));
}

Seq.of = function (f)
{
    return new Seq(function ()
    {
        return f;
    });
};

Seq.prototype.map = function (f)
{
    return new Seq(compose(f, this.__value));
};

Seq.prototype.ap = function (other)
{
    return other.map(this.__value());
};

Seq.prototype.join = function()
{
    return this.__value();
};

module.exports = Seq;