var test = require('tape'),
    b = require('../dist/bodydash.umd.js'),
    array = b.array,
    Container = b.container,
    contracts = b.contracts;

var gHelpers = {
    compare: function (a, b)
    {
        return JSON.stringify(b) === JSON.stringify(b);
    }
};

test('array', function (t)
{
    t.plan(6);

    var mapT = array.map(function (a)
        {
            return a * 2;
        }, [1, 2, 3, 4, 5]),
        filterT = array.filter(function (a)
        {
            return a % 3 === 0;
        }, mapT),
        reduceT = array.reduce(function (a, b)
        {
            return a + b;
        }, filterT),
        first = array.head(mapT),
        last = array.last(mapT),
        safeFirst = array.safeHead(mapT),
        safeFirst2 = array.safeHead([])
            .map(function (e)
            {
                return e * e;
            });

    var out = [];
    array.each(function (el, i)
    {
        out.push([el, i]);
    }, [1, 2, 3, 4]);
    out = [].slice.call(out, 1, out.length);

    t.equal(reduceT, 6);
    t.equal(first, 2);
    t.equal(last, 10);
    t.equal(Object.getPrototypeOf(safeFirst).constructor.name, 'Maybe');
    t.equal(safeFirst2.__value, null);
    t.equal(JSON.stringify(out[0]), '[2,1]');

    t.end();
});

test('container', function (t)
{
    t.plan(4);

    var ContainerT = Container.of(5),
        ContainerT2 = new Container(5),
        ContainerMapT = ContainerT.map(function (value)
        {
            return value * value
        }),
        ContainerMapT2 = ContainerT2.map(function (value)
        {
            return value * value
        });


    t.equal(ContainerT.__value, 5);
    t.equal(ContainerT.__value, ContainerT2.__value);
    t.equal(ContainerMapT.__value, 25);
    t.equal(ContainerMapT.__value, ContainerMapT2.__value);

    t.end();
});

test('contracts', function (t)
{
    t.plan(4);

    var helpers = {
        objCheck: function (o)
        {
            return typeof o === 'object';
        }
    };

    var divElement = document.createElement('div');

    var arrT = contracts.arr([]),
        strT = contracts.str("Text"),
        classOfT = contracts.classOf('HTMLDivElement')(divElement),
        typeOfT = contracts.typeOf('number')(1);

    t.equal(helpers.objCheck(arrT), true);
    t.equal(strT, "Text");
    t.equal(gHelpers.compare(classOfT), gHelpers.compare(divElement));
    t.equal(typeOfT, 1);

    t.end();

});
