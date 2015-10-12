
function select(selector) {
	return new IO(function() {
		if(selector.indexOf('.') !== -1) return document.getElementsByClassName(selector.split('.').join(''));
		if(selector.indexOf('#') !== -1) return document.getElementById(selector.split('#').join(''));
		
		return document.getElementsByTagName(selector);

	});
}

function selectOne(selector) {
	return new IO(function() {
		return document.querySelector(selector);
	});
}

function style(selector, property, value) {
	return new IO(function() {
		return select(selector).map(function(e) {  e.style[property] = value; }).join();
	});
}

function addClass(cls, element) { // add map to elements and wrap in IO
	return new IO(function() {
		return each(function(e) { // can't be map :(
			return e.className += " " + cls;
		},element.__value());
	})
}	

function removeClass(cls, ele) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
}

function removeElement(element) {
	return element.style.display = 'none';
}
function children(element) {
	return element.children;
}
function href() {
	return new IO(function() {
		return window.location.href;
	});
}

function delay(time,f) {
    setTimeout(function () {
    	return f.__value();
    }, time);
}

function getItem(key) { 
	return new IO(function() { 
		return localStorage.getItem(key); 
	}); 
}

var delay = curry(delay), style = curry(style), addClass = curry(addClass), removeClass = curry(removeClass);