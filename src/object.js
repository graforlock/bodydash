//--->>> Object utils
var contracts = require('./contracts'),
    curry = require('./curry'),
    Maybe = require('./maybe');

var object = {

    extend: function extend(destination, source)
    {
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

    extendData: function (target, data)
    {
        return object.extendObj(target, data);
    },

    extendObj: function (destination, source)
    {
        return object.extend(contracts.obj(destination), contracts.obj(source));
    },

    mergeObj: function (toExtend)
    {
        return contracts.objArr(toExtend)
            .map(function (e)
            {
                return object.extendObj({}, e)
            })
            .reduce(function (a, b)
            {
                return object.extendObj(a, b)
            });
    },

    newObj: function ()
    {
        return object.extendObj({}, {});
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