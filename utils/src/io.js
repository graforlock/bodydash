function IO(f) {
	this.__value = f;
}

IO.of = function(x) {
	return new IO(function() {
		return x;
	});
}

IO.prototype.map = function(f) { // map is perfect for Event Streams
	return new IO(compose(f,this.__value));
}

IO.prototype.join = function() {
	return this.__value();
}

IO.prototype.log = function() {
	var f = this.__value;
	this.__value()(function(e) {
		console.log('Logging Event: '  + e);
		
	});
	return new IO(f); 
}

IO.prototype.delay = function(time) {
	f = this.__value;
	 setTimeout(function () {
    	return f();
    }, time);
}

IO.prototype.take = take; // should take only this many events

IO.prototype.skip = skip; // skips initial events

IO.prototype.chain = function(f) { 
	return this.map(f).join(); 
}

IO.prototype.each = function(f) { // Impure function call, reserved for DOM
	return new IO(each(f, this.__value() ));
}

IO.prototype.ap = function(other) {
	return other.map(this.__value()); // Function requirement
}

// TODO: take, skip, 
//       merge, concat -> Monoid