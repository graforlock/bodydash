var test = require('tape'),
    b = require('../dist/bodydash.umd.js'),
    array = b.array,
    Container = b.container,
    contracts = b.contracts,
    curry = b.curry,
    debug = b.debug,
    core = b.core,
    Maybe = b.maybe,
    Left = b.left,
    Right = b.right,
    IO = b.io,
    either = b.either,
    Seq = b.seq,
    lift = b.lift,
    math = b.math;

/* @Before All Tests */
var gSetup = {
    compare: function (a, b)
    {
        return JSON.stringify(a) === JSON.stringify(b);
    },
    compareFunc: function (a, b)
    {
        return a.toString() === b.toString();
    }
};

test('ARRAY', function (t)
{
    t.plan(8);

    /* @Before */
    var setup = {
        array: [1, 2, 3, 4, 5]
    };

    /* @Tests */
    var mapT = array.map(function (a)
        {
            return a * 2;
        }, setup.array),
        filterT = array.filter(function (a)
        {
            return a % 2 !== 0;
        }, setup.array),
        reduceT = array.reduce(function (a, b)
        {
            return a + b;
        }, mapT),
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

    t.equal(gSetup.compare(mapT, [2, 4, 6, 8, 10]), true,
        '| map(f, xs) -> Maps numbers.');
    t.equal(gSetup.compare(filterT, [1, 3, 5]), true,
        '| filter(f, xs) -> Filters Odd numbers.');
    t.equal(reduceT, 30,
        '| reduce(f, xs) -> Reduces Odd numbers.');
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
    //... no setup

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
    t.plan(12);

    /* @Before */
    var setup = {
        objCheck: function (o)
        {
            var _type = {}.toString;
            return _type.call(o);
        },
        func: function ()
        {
        }
    };
    var divElement = document.createElement('div');

    /* @Tests */
    var arrT = contracts.arr([]),
        strT = contracts.str("Text"),
        numT = contracts.num(0),
        objT = contracts.obj({}),
        funcArrT = contracts.funcArr([setup.func, setup.func]),
        numArrT = contracts.numArr([1, 2, 3]),
        strArrT = contracts.strArr(['A', 'B', 'C']),
        objArrT = contracts.objArr([{}, {}, {}]),
        arrArrT = contracts.arrArr([[], [], []]),
        classOfT = contracts.classOf('HTMLDivElement')(divElement),
        typeOfT = contracts.typeOf('number')(1);

    t.equal(numT, 0,
        '| num(v) -> Validates contract with the number guard.');
    t.equal(gSetup.compare(objT, {}), true,
        '| obj(v) -> Validates contract with the object guard.');
    t.equal(gSetup.compareFunc(contracts.func(
        setup.func),
        setup.func),
        true,
        '| func(v) -> Validates contract with the function guard.');
    t.equal(setup.objCheck(arrT), '[object Array]',
        '| arr(v) -> Validates contract with the array guard.');
    t.equal(gSetup.compare(funcArrT, [setup.func, setup.func]), true,
        '| funcArr(v) -> Validates contract with the function array guard.');
    t.equal(gSetup.compare(numArrT, [1, 2, 3]), true,
        '| numArr(v) -> Validates contract with the number array guard.');
    t.equal(gSetup.compare(strArrT, ['A', 'B', 'C']), true,
        '| strArr(v) -> Validates contract with the string array guard.');
    t.equal(gSetup.compare(objArrT, [{}, {}, {}]), true,
        '| objArr(v) -> Validates contract with the object array guard.');
    t.equal(gSetup.compare(arrArrT, [[], [], []]), true,
        '| arrArr(v) -> Validates contract with the array of arrays guard.');
    t.equal(strT, "Text",
        '| str(v) -> Validates contract with the string guard.');
    t.equal(gSetup.compare(classOfT, divElement), true,
        '| classOf(t)(v) -> Ascertains object type and outputs the value if compatible.');
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

test('DEBUG', function (t)
{
    t.plan(1);

    /* @Before */
    var setup = {
        testInput: function (a)
        {
            return a;
        },
        testOutput: function (a)
        {
            return a + a;
        }
    };

    /* @Tests */
    var composedT = core.compose(setup.testOutput, debug("Debugger Log: input is"), setup.testInput);

    t.equal(composedT(5), 10,
        '| debug(s, v) -> Should pass the value around and perform console.log side effect.');

    t.end();

});


test('EITHER', function (t)
{
    t.plan(2);

    /* @Before */
    var setup = {
        result: function (a, b)
        {
            return 'Left hand side is [ ' + a + ', ' + b + ' ]';
        },
        resolve: function (f)
        {
            return setup.result(f[0].id, f[1].id);
        },
        reject: function (err)
        {
            return 'Right hand side rejection with ' + err.status;
        }
    };

    /* @Tests */
    var left = new Left([{id: 1}, {id: 2}]),
        right = new Right({status: 404}),
        eitherT = either(setup.resolve, setup.reject, left),
        eitherT2 = either(setup.resolve, setup.reject, right);

    t.equal(eitherT, setup.result(1, 2),
        '| either(f, g, e) -> Ascertains Left side of the statement.');
    t.equal(eitherT2, setup.reject({status: 404}),
        '| either(f, g, e) -> Ascertains Right side of the statement.');

    t.end();
});


test('SEQUENCE', function (t)
{
    t.plan(2);

    /* @Before */
    var setup = {
        appendString: curry(function (s, v)
        {
            return v + s;
        }),
        prependString: curry(function (s, v)
        {
            return s + v;
        })
    };

    /* @Tests */
    var seqT = Seq.of("Chained").take(5, setup.appendString('-1')),
        seqT2 = Seq.of("Prepended").take(5);

    t.equal(seqT.__value(), "Chained-1-1-1-1-1",
        '| Seq.take(n, f) -> Successfully takes five values.');
    t.equal(seqT2(setup.prependString('1-')).__value(), "1-1-1-1-1-Prepended",
        '| Seq.take(n)(f) -> Partially takes five values.');

    t.end();

});

test('LIFT', function (t)
{
    t.plan(4);

    var setup = {
        functor: {
            A: IO,
            B: Container,
            C: Maybe
        },
        fn: {
            plusplus: math.plusplus,
            add: math.add,
            addThree: curry(function addThree(a, b, c)
            {
                return a + b + c;
            }),
            addFour: curry(function addFour(a, b, c, d)
            {
                return a + b + c + d;
            })
        }
    };

    var liftA1T = lift.liftA1(setup.fn.plusplus,
            setup.functor.B.of(1)),
        liftA2T = lift.liftA2(setup.fn.add,
            setup.functor.B.of(1), setup.functor.B.of(2)),
        liftA3T = lift.liftA3(setup.fn.addThree,
            setup.functor.A.of(1), setup.functor.A.of(2), setup.functor.A.of(3)),
        liftA4T = lift.liftA4(setup.fn.addFour,
            setup.functor.C.of(1), setup.functor.C.of(2),
            setup.functor.C.of(3), setup.functor.C.of(4));

    t.equal(liftA1T.__value, 2,
        '| liftA1(f, F1) -> Correctly lifts one Applicative Functor.');
    t.equal(liftA2T.__value, 3,
        '| liftA2(f, F1, F2) -> Correctly lifts two Applicative Functors.');
    t.equal(liftA3T.__value(), 6,
        '| liftA3(f, F1, F2, F3) -> Correctly lifts three Applicative Functors.');
    t.equal(liftA4T.__value, 10,
        '| liftA3(f, F1, F2, F3, F4) -> Correctly lifts four Applicative Functors.');

    t.end();
});

/* TODO:

 test('LENS', function(t)
 {

 });

 test('MATH', function(t)
 {

 });

 test('MAYBE', function(t)
 {

 }); */
