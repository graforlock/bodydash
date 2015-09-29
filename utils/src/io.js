function IO(f) {
	this.__value = f;
}

IO.of = function(x) {
	return new IO(function() {
		return x;
	});
}

IO.prototype.map = function(f) {
	return new IO(compose(f,this.__value));
}

IO.prototype.join = function() {
	return this.__value();
}

IO.prototype.chain = function(f) { 
	return this.map(f).join(); 
}