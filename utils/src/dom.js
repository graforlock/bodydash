// function select(selector) {
// 	return new IO(function() {
// 		return document.querySelectorAll(selector);
// 	});
// } 

// function querySelector(selector) {
// 	return new IO(function() {
// 		return document.querySelector(selector);
// 	});
// } 

function select(selector) {
	return new IO(function() {
		if(selector.indexOf('.') !== -1) return document.getElementsByClassName(selector.split('.').join(''));
		if(selector.indexOf('#') !== -1) return document.getElementById(selector.split('#').join(''));
		
		return document.getElementsByTagName(selector);

	});
}

function style(selector, property, value) {
	return new IO(function() {
		return join(select(selector).map(function(e) { return head(e).style[property] = value; }));
	});
}

function addClass(cls, element) {
		return element.className += " " + cls;
}

function removeClass(cls, ele) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
}

function removeElement(element) {
	return element.style.display = 'none';
}

function href() {
	return new IO(function() {
		return window.location.href;
	});
}

function delay(time,f) {
	return setTimeout(function() {
		return f.__value();
	},time);
}


function getItem(key) { 
	return new IO(function() { 
		return localStorage.getItem(key); 
	}); 
}

var delay = curry(delay), style = curry(style), addClass = curry(addClass), removeClass = curry(removeClass);