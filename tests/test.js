var test = require('tape'),
    b = require('../dist/bodydash.umd.js'),
    array = b.array,
    Container = b.container,
    contracts = b.contracts,
    curry = b.curry;

/* @Before All Tests */
var gSetup = {
    compare: function (a, b)
    {
        return JSON.stringify(b) === JSON.stringify(b);
    }
};

test('ARRAY', function (t)
{
    t.plan(6);

    /* @Before */
    //...

    /* @Tests */
    var mapT = array.map(function (a)
        {
            return a * 2;
        }, [1, 2, 3, 4, 5]),
        filterT = array.filter(function (a)
        {
            return a === 1 || a % 3 === 0;
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

    t.equal(reduceT, 6,
        '| reduce(f, xs) -> Reduces Even numbers.');
    t.equal(first, 2,
        '| head(xs) -> Returns first item in the array.');
    t.equal(last, 10,
        '| last(xs) -> Returns last item in the array.');
    t.equal(Object.getPrototypeOf(safeFirst).constructor.name, 'Maybe',
        '| safeHead(n) -> Returns Maybe monad of value.');
    t.equal(safeFirst2.__value, null,
        '| safeHead(n) -> Returns Maybe monad of null.');
    t.equal(JSON.stringify(out[0]), '[2,1]',
        '| slice.call(xs, a, b) -> Returns  a correct slice..');

    t.end();
});

test('CONTAINER', function (t)
{
    t.plan(4);

    /* @Before */
    //...

    /* @Tests */
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

    t.equal(ContainerT.__value, 5,
        '| Container.of(v) -> Contains the number 5.');
    t.equal(ContainerT.__value, ContainerT2.__value,
        '| Container.of(v) and new Container(v) -> Both values in Containers are the same.');
    t.equal(ContainerMapT.__value, 25,
        '| Container.map(f) -> Container.of maps and the value is expected.');
    t.equal(ContainerMapT.__value, ContainerMapT2.__value,
        '| new Container(v) -> Contain maps and the value is expected.');

    t.end();
});

test('CONTRACTS', function (t)
{
    t.plan(4);

    /* @Before */
    var setup = {
        objCheck: function (o)
        {
            return typeof o === 'object';
        }
    };
    var divElement = document.createElement('div');

    /* @Tests */
    var arrT = contracts.arr([]),
        strT = contracts.str("Text"),
        classOfT = contracts.classOf('HTMLDivElement')(divElement),
        typeOfT = contracts.typeOf('number')(1);

    t.equal(setup.objCheck(arrT), true,
        '| arr(v) -> Validates contract with a arr guard.');
    t.equal(strT, "Text",
        '| str(v) -> Validates contract with a str guard.');
    t.equal(gSetup.compare(classOfT), gSetup.compare(divElement),
        '| Ascertains object type and outputs the value if compatible.');
    t.equal(typeOfT, 1,
        '| typeOf(t)(v) -> Ascertains primitive type and outputs the value if compatible.');

    t.end();

});

test('CURRY', function (t)
{
    t.plan(1);

    /* @Before */
    var setup = {
        testFn: function (a, b)
        {
            return a + b;
        }
    };

    /* @Tests */
    var curriedOneT = curry(setup.testFn)(5),
        curriedTwoT = curry(setup.testFn);

    t.equal(curriedOneT(6), curriedTwoT(5, 6),
        '| curry(fn) -> Successful partial application.');

    t.end();

});