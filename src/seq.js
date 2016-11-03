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

Seq.prototype.take = curry(function(num, f)
{
    var list = [];
    for(var i = 1; i < num; i++)
    {
        list.push(f);
    }
    return compose.apply(null, list)(this.join());
});

Seq.prototype.map = function(f)
{
    return new Seq(compose(f, this.__value));
};

Seq.prototype.ap = function (other)
{
    return other.map(this.__value());
};


module.exports = Seq;