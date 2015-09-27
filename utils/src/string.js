function toLower(a) {
    return a.toLowerCase();
}
var toLower = curry(toLower);

function concat(a,b) {
    return a.concat(b);
}

var concat = curry(concat);