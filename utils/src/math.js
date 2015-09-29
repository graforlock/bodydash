function add(x,y) {
    return x+y;
}

function subtract(x,y) {
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

function plusplus(x) {
	return ++x;
}

function minusminus(x) {
	return --x;
}

function rand(x) {
	return Math.floor(Math.random() * x) + 1;
}

var add = curry(add),
    subtract = curry(subtract),
    times = curry(times),
    divide = curry(divide);