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
	
	/*  'f' can be the wrapper function for the monad this.__value ->
	__________________________________________________________
		 Sample use:
	----------------------------------------------------------
		 EventStream('#action','click')
		.map(function(e) { return e.__value(debug(': '));})
		.__value()
	----------------------------------------------------------
	*/
}

IO.prototype.emap = function(f) {
	// var value = this.__value;
	// return this.chain(); Has to take up the below structure
	// return this.map(function(e) {
	// 	return new IO(compose(e.__value,f)); 
	// 	// it will lose IO; has to be some means to prevent it
	// });	
	return this.chain(function(e) {
		return new IO(compose(e.__value,f)); 
		// it will lose IO; has to be some means to prevent it
	});
}


IO.prototype.join = function() {
	return this.__value();
}

IO.prototype.log = function() {
	var f = this.__value;
	// this.__value()(function(e) {
	// 	console.log('Logging Event: '  + e);
		
	// });
	return f(debug(': ')); 
}

IO.prototype.do = function(fun) {
	var f = this.__value;
	this.__value()(fun);
	return new IO(f); 
}


IO.prototype.delay = function(time) {
	f = this.__value;
	 setTimeout(function () {
    	return f();
    }, time);
}

IO.prototype.output = function() {
	return this.__value();
}

IO.prototype.take = function() {
	// lookup emap
}
IO.prototype.skip = function(num) {
	// lookup emap

}
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