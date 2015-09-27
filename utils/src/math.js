function add(x,y) {
    return x+y;
}

function minus(x,y) {
    return x-y;
}

function times(x,y) {
    return x*y;
}

function divide(x,y) {
    return x / y;
}

function square(x) {
    return x*x;
}

function cube(x) {
    return square(x)*x;
}

var add = curry(add),
    minus = curry(minus),
    times = curry(times),
    divide = curry(divide);