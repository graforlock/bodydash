//-->>> I/O
var core = require('./core'),
    debug = require('./debug'),
    array = require('./array');

function IO(f)
{
    this.__value = f;
}

IO.of = function (x)
{
    return new IO(function ()
    {
        return x;
    });
};

IO.prototype.map = function (f)
{
    return new IO(core.compose(f, this.__value));
};

IO.prototype.emap = function (f)
{
    /* 'f' needs to be curried
       var value = this.__value; <- value to pass over?
     */
    return this.chain(function (e)
    {
        return new IO(core.compose(e.__value, f));
        // it will lose I/O; has to be some means to prevent it
    });
};


IO.prototype.join = function ()
{
    return this.__value();
};

IO.prototype.log = function ()
{
    var f = this.__value;
    return f(debug(': '));
};

IO.prototype.do = function (fun)
{
    var f = this.__value;
    this.__value()(fun);
    return new IO(f);
};

IO.prototype.first = function ()
{
    return new IO(core.compose(head, this.__value));
};


IO.prototype.delay = function (time)
{
    f = this.__value;
    setTimeout(function ()
    {
        return f();
    }, time);
};

IO.prototype.output = function ()
{
    return this.__value();
};


IO.prototype.chain = function (f)
{
    return this.map(f).join();
};

IO.prototype.each = function (f)
{
    return new IO(array.each(f, this.__value()));
};

IO.prototype.ap = function (other)
{
    return other.map(this.__value()); // Function requirement
};


module.exports = IO;