//--->>> Object utils
var contracts = require('./contracts'),
    curry = require('./curry'),
    Maybe = require('./maybe');

var object = {

    extend: function extend(destination, source)
    {
        destination = contracts.obj(destination),
        source = contracts.obj(source);

        for (var property in source)
        {
            if (source[property] && source[property].constructor &&
                source[property].constructor === Object)
            {
                destination[property] = destination[property] || {};
                extend(destination[property], source[property]);
            } else
            {
                destination[property] = source[property];
            }
        }
        return destination;
    },

    extendTwo: curry(function (a, b)
    {
        a = contracts.obj(a),
        b = contracts.obj(b);
        return [a, b].reduce(function (a, b)
        {

            for (var key in b)
            {
                a[key] = b[key];
            }
            return a;
        }, {});
    }),

    extendMany: function (toExtend)
    {
        return contracts.objArr(toExtend)
            .map(function (e)
            {
                return object.extend({}, e)
            })
            .reduce(function (a, b)
            {
                return object.extend(a, b)
            });
    },

    newObj: function ()
    {
        return object.extend({}, {});
    },

    immutable: function (o)
    {
        o = contracts.obj(o);
        return Object.freeze(o);
    },

    inProto: function (o, name)
    {
        return name in o && !o.hasOwnProperty(name);
    },

    hasOwn: function (o, name)
    {
        return !object.inProto(o, name);
    },

    prop: curry(function (key, obj)
    {
        return obj[key];
    }),

    safeProp: curry(function (x, o)
    {
        return new Maybe(o[x]);
    }),

    protoOf: function (o)
    {
        return Object.getPrototypeOf(o);
    }

};


module.exports = object;