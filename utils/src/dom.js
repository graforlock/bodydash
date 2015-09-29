function select(selector) {
	return new IO(function() {
		return document.querySelectorAll(selector);
	});
} 

function style(selector, property, value) {
	return new IO(function() {
		return join(select(selector).map(function(e) { return head(e).style[property] = value; }));
	});
}

function href() {
	return new IO(function() {
		return window.location.href;
	});
}

function delay(time,f) {
	return setTimeout(f,time);
}

var delay = curry(delay), style = curry(style);