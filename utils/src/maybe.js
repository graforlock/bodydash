
function Maybe(x) {
    this.__value = x;
}

Maybe.of = function(x) {
    return new Maybe(x);
}

Maybe.prototype.isNothing = function() {
    return (this.__value === null || this.__value === undefined);
}

Maybe.prototype.map = function (f) { 
    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value)); 
}

Maybe.prototype.join =  function() {
	return this.isNothing() ? Maybe.of(null) : this.value;
}

var maybe = curry(function(x,f,m) { // Maybe helper for custom value (instead of 'null')
    return m.isNothing() ? x : f(m.__value);
 });
