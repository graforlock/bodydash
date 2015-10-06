//-->>> General Tools

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    }
}
function compose() {
    var funcs = arrayOf(func)([].slice.call(arguments));
    return function() {
        var fargs = arguments;
        for (var i = funcs.length - 1; i >= 0; i -= 1) {
            fargs = [funcs[i].apply(this, fargs)];
        }
        return fargs[0];
    }
}


function mcompose(f,g) { // Monad/Functor compose
    return compose(chain(f), chain(g));
}

function curry(fn) {
    var arity = fn.length;

    return getArgs([]);

    function getArgs(totalArgs) {
        return function stepTwo() {
            var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
            if (nextTotalArgs.length >= arity)
                return fn.apply(this, nextTotalArgs);
            else
                return getArgs(nextTotalArgs);

        }
    }
}

function flatten(array) {
    return arr(array).reduce(function(a, b) {
        return a.concat(b);
    });

}

function flip(fn) {
    return function(first) {
        return function(second) {
            return fn.call(this, second, first);
        };
    };
};

function flipMany(fn) {
    return function() {
        var first = toArray(arguments);
        return function() {
            var second = toArray(arguments);
            return fn.apply(this, concat(second, first));
        };
    };
};

function join(monad) {
    return monad.join();
}

function chain(f,m) {
    return m.map(f).join();
}

var chain = curry(chain);

function variadic(fn) {
    if (fn.length < 1) return fn;

    return function() {
        var ordinaryArgs = (1 <= arguments.length ?
                slice.call(arguments, 0, fn.length - 1) : []),
            restOfTheArgsList = slice.call(arguments, fn.length - 1),
            args = (fn.length <= arguments.length ?
                ordinaryArgs.concat([restOfTheArgsList]) : []);

        return fn.apply(this, args);
    }
};

//--->> Contracts

function str(s) {
    if (typeof s === 'string')
        return s;
    else
        throw new TypeError('Error: Input excepts String type');
}

function classOf(s) {
    s = str(s);
    return function(a) {
        if ({}.toString.call(a) === '[object ' + s + ']')
            return a;
        else
            throw new TypeError('Error: Input excepts ' + s + ' type');
    }
}

function typeOf(s) {
    s = str(s);
    return function(v) {
        if (typeof v === s)
            return v;
        else
            throw new TypeError('Error: Input excepts ' + s + ' type');
    }
}

function obj(o) {
    return classOf('Object')(o);

}

function arr(a) {
    return classOf('Array')(a);
}

function func(f) {
    return typeOf('function')(f);
}

function num(n) {
    return typeOf('number')(n);
}

function id(x) {
    return x;
}

function isArr(a) {
    if ({}.toString.call(a) === '[object Array]')
        return a;
    else
        return false;
}

function arrayOf(c) {
    return function(a) {
        return arr(a).map(c);
    }
}

function funcArr(a) {
    return arrayOf(func)(a);
}

function numArr(a) {
    return arrayOf(num)(a);
}

function strArr(a) {
    return arrayOf(str)(a);
}

function objArr(a) {
    return arrayOf(obj)(a);
}

function arrArr(a) {
    return arrayOf(arr)(a);
}

function toArray(array) {
    return [array];
}

function safeArray(array) {
    return new Maybe([].slice.call(array));
}

//--->>> Object utils

function immutable(o) {
    o = obj(o);
    return Object.freeze(o);
}

function inProto(o, name) {
    return name in object && !o.hasOwnProperty(name);
}

function hasOwn(o, name) {
    return !inProto(o, name);
}

function prop(key,obj) {
    return obj[key];
}

function protoOf(o) {
    return Object.getPrototypeOf(o);
}

var prop = curry(prop),
    safeProp = curry(function(x,o) { return new Maybe(o[x]);}),
    safeHead = safeProp(0);



//--->>> Arrays

function head(xs) {
    return xs[0];
}

function last(xs) {
    return xs[xs.length-1];
}

function each(cb, array) { // nodeLists
  for (var i = 0; i < array.length; i++) {
         cb.call(null,array[i]); 
  }
};

var slice = Array.prototype.slice, each = curry(each);

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
function children(element) {
	return element.children;
}
function href() {
	return new IO(function() {
		return window.location.href;
	});
}

// function delay(time,f) {
// 	return setTimeout(function() {
// 		return f.__value();
// 	},time);
// }

function delay(time,f) {
  return new Task(function(rej, res) {
    setTimeout(function () {
      return res(f.__value());
    }, time);
  });
}

function getItem(key) { 
	return new IO(function() { 
		return localStorage.getItem(key); 
	}); 
}

var delay = curry(delay), style = curry(style), addClass = curry(addClass), removeClass = curry(removeClass);
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

IO.prototype.each = function(f) { // Impure function call, reserved for DOM
	return new IO(each(f, this.__value() ));
}

IO.prototype.ap = function(other) {
	return other.map(this.__value()); // Function requirement
}

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
	return this.isNothing() ? Maybe.of(null) : this.__value;
}

Maybe.prototype.ap = function(other) {
	return other.map(this.__value); 
	// Functor requirement: It maps (other Functor's map) over current Functor's __value.
}

// Maybe.prototype.ap = function(vs) {
//       return (typeof this.value !== 'function') ? new Maybe(null) : vs.map(this.value);
//     };

var maybe = curry(function(x,f,m) { 
    return m.isNothing() ? x : f(m.__value);
	// Maybe helper for custom value (instead of 'null')
 });

function map(f,xs) {

    return xs.map(f);
}

var map = curry(map); // Pointfree map 



function observe(value) {
    var listeners = [];

    function notify(newValue) {
        listeners.forEach(function(listener) {
            listener(newValue);
        });
    }

    function accessor(newValue) {
        if (arguments.length && newValue !== value) {
            this.value = newValue;
            notify(newValue);
        }
        return this.value;
    }

    accessor.subscribe = function(listener) {
        listeners.push(listener);
    };

    return accessor;
}
function extend(destination, source) {

    for (var property in source) {
        if (source[property] && source[property].constructor &&
            source[property].constructor === Object) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

function extendData(target, data) {
    return extendObj(target, data);
}

function extendObj(destination, source) {
    return extend(obj(destination), obj(source));
}

function mergeObj(toExtend) { // A.K.A. Extend Many
    return objArr(toExtend)
        .map(function(e) {
            return extendObj({}, e)
        })
        .reduce(function(a, b) {
            return extendObj(a, b)
        });
}

function newObj() {
    return extendObj({}, {});
}