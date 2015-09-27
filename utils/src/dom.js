function select(selector) {
	return new IO(function() {
		return document.querySelectorAll(selector);
	});
} 

function href() {
	return new IO(function() {
		return window.location.href;
	});
}

function delay(time,f) {
	return setTimeout(f,time)
}

var delay = curry(delay);