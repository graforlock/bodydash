function Set(arr)
{
    this.set = [];

    this.add = function ()
    {
        if (arguments.length)
        {
            var array = [].slice.call(arguments)[0],
                temp = {};

            for (var i = 0; i < array.length; i++)
            {
                temp[array[i]] = array[i];
            }

            for (var key in temp)
            {
                if (this.set.indexOf(temp[key]) === -1)
                    this.set.push(temp[key]);
            }
        }
    }.bind(this);

    this.add(arr);

    return this instanceof Set ? this : this.set;
}

Set.prototype.toMap = function ()
{
    this.set = this.set.reduce(function (a, b)
    {
        a[b] = b;
        return a;
    }, {});
    return this.set;
};

module.exports = {
    Set: Set
};