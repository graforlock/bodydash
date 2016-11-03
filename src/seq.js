//--->>> Lazy Sequence
var compose = require('./core').compose,
    curry = require('./curry');

function Seq(v)
{
    this.__value = v;
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

Seq.of = function (v)
{
    return new Seq(function ()
    {
        return v;
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

module.exports = Seq;