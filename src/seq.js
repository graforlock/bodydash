//--->>> Seq
var compose = require('./core').compose,
    curry = require('./curry');

function Seq(v)
{
    this.__value = v;
}

Seq.of = function (v)
{
    return new Seq(function ()
    {
        return v;
    });
};

Seq.prototype.join = function()
{
    return this.__value();
};

Seq.prototype.lift = function(other, fn)
{
    other = other.__value;
    return new Seq(function()
    {
        return fn(this.__value(), other())
    }.bind(this));
};

Seq.prototype.take = curry(function(num, fn)
{
    var list = [];
    for(var i = 1; i < num; i++)
    {
        list.push(fn);
    }
    return compose.apply(null, list)(this.join());
});

Seq.prototype.ap = function (other)
{
    return other.map(this.__value);
};


module.exports = Seq;