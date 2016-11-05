function Identity(v)
{
    this.__value = v;
}

Identity.of = function (v)
{
    return new Identity(v);
};

Identity.prototype.map = function (f)
{
    return new Identity(f(this.__value));
};

Identity.prototype.ap = function (other)
{
    return other.map(this.__value);
};

Identity.prototype.join = function()
{
  return this.__value;
};

module.exports = Identity;