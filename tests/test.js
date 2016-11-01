var test = require('tape'),
    b = require('../dist/bodydash.umd.js'),
    array = b.array;


test('array', function (t)
{
    t.plan(6);

    var mapT = array.map(function (a) { return a * 2; }, [1, 2, 3, 4, 5]),
        filterT = array.filter(function(a) { return a % 3 === 0; }, mapT),
        reduceT = array.reduce(function(a, b) { return a + b; }, filterT),
        first = array.head(mapT),
        last = array.last(mapT),
        safeFirst = array.safeHead(mapT),
        safeFirst2 = array.safeHead([])
            .map(function(e) { return e * e; });

    var out = [];
    array.each(function(el, i) { out.push([el, i]); }, [1, 2, 3, 4]);
    out = [].slice.call(out, 1, out.length);

    t.equal(reduceT, 6);
    t.equal(first, 2);
    t.equal(last, 10);
    t.equal(Object.getPrototypeOf(safeFirst).constructor.name, 'Maybe');
    t.equal(safeFirst2.__value, null);
    t.equal(JSON.stringify(out[0]), '[2,1]');

    t.end();
});
