// OVERALL TODO: --->>> Will depend heavily on data.task through Browserify/CommonJS
var Http = {};

function ajax() {
    return new XMLHttpRequest();
}

function JSONparse(res) {
    return JSON.parse(res);
}


//Refactor the GET to take composed callback-->> ajaxGET(url,target)
// function parametrize(params) {
//     params = obj(params);
//     var result = "";
//     keys = Object.keys(params);
//     keys.forEach(function(e,i) {
//             if(i !== 0) result += concat(concat('&',String(e)),concat('=',params[e]));
//             else result += concat(concat('?',String(e)),concat('=',params[e]));
//     });    
//     return result;
// }
// function getJSON(url) {
//         // params = params || "";
//         // if(params.toString() === '[ object Object ]') params = parametrize(params);
//         url = str(url);
//         xhr = ajax();
//         xhr.onreadystatechange = function() {
//             if (xhr.status == 200 && xhr.readyState == 4) {
//                 return JSONparse(xhr.responseText); // remove callack dependency
//             }
//             if (xhr.status == 404) return new Error('404: Not Found');
//             if (xhr.status == 500) return new Error('500: Internal server Error.');
//         }
//         xhr.open('GET', url /*+ params*/);
//         xhr.send(null);
// }

Http.JSON = function(url, params) { 
            return new Task(function(reject,result) {
                return $.getJSON(url, params, result).fail(reject);
            });
};

// Refactor POST like get -->> ajaxPOST(url,cb)

Http.POST = function() {

}

Http.GET = function(url) {
	
}

// -->>

// Create ajaxJSONP out of it: -->>

// var scr = document.createElement('script')
// scr.src = '//openexchangerates.org/latest.json?callback=formatCurrency'
// document.body.appendChild(scr)

function Container(x) {
    this.__value = x;
}

Container.of = function(x) {
    return new Container(x);
}

Container.prototype.map = function(f) {
    return Container.of(f(this.__value));
}


function debounce(func, wait, immediate) { 
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function debug(tag,x) {
        console.log(tag, x);
        return x;
}

var debug = curry(debug);

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

function Left(x) { 
    this.__value = x;
}

Left.of = function(x) {
    return new Left(x);
}

Left.prototype.map = function(f) {
    return this;
}

function Right(x) {
    this.__value = x;
}

Right.of = function(x) {
    return new Right(x);
}

Right.prototype.map = function(f) {
    return Right.of(f(this.__value));
}

var either = curry(function(f /* identity in mose cases */, g, e) {
     switch (e.constructor) { 
        case Left: return f(e.__value); 
        case Right: return g(e.__value); 
    } 
});

function eventMap(target) {
    return bind(findEvent, target);
}

function findEvent(event) {
    event = event.toLowerCase();
    if (this.hasOwnProperty(event))
        return this[event]();
    else
        throw new Error(this.constructor.name + ': Property "' + event +'" Not Found on the Object');
}

function Events(target) {

    this.target = target;
    this.fetched = function() {
        // On GET do:
        console.log('Executing on fetched!');
    };
    this.save = function() {
        // On SAVE/UPDATE do:
        console.log('Executing on save!');
    };
    this.post = function() {
        // On POST do:
        console.log('Executing on post!');
    };
}


function eventEmitter() {
    if(this instanceof eventEmitter) {
        this.triggerEvent = function(data) {
            eventEmitter.eventHandler(data);
        },
        this.setHandler = function(eventHandler) {
            eventEmitter.eventHandler = eventHandler;
        },
        this.eventHandler = function() {

        }
    } else {
        return new eventEmitter();
    }
}

function triggerEvents(src, event) {
    event = str(event);
    return src.triggerEvent(event);
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

function filter(f,xs) {
    return xs.filter(f);
}

var filter = curry(filter); // Pointfree filter
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
function lens(set, get) {
    var f = function(a) {
        return get(a);
    }
    f.set = set;
    f.get = function(a) {
        return get(a);
    };
    f.modify = function(func, a) {
        return set(a, f(get(a)));
    };
    return f;
}
function liftA2(f,functor1,functor2) {
	return functor1.map(f).ap(functor2);
} 

function liftA3(f,functor1,functor2,functor3) {
	return functor1.map(f).ap(functor2).ap(functor3);
}

function liftA4(f,functor1,functor2,functor3) {
	return functor1.map(f).ap(functor2).ap(functor3);
}

var liftA2 = curry(liftA2), liftA3 = curry(liftA3), liftA4 = curry(liftA4);
function map(f,xs) {

    return xs.map(f);
}

var map = curry(map); // Pointfree map 

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

var maybe = curry(function(x,f,m) { 
    return m.isNothing() ? x : f(m.__value);
	// Maybe helper for custom value (instead of 'null')
 });

function memoize(fn,keymaker) {
    var lookup = {}, key;

    keymaker || (keymaker = function(args) {
        return JSON.stringify(args);
    });
    return function() {
        var key =  keymaker.call(this,arguments);

        return lookup[key] || (lookup[key] = fn.apply(this, arguments));
    }
}



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


function reduce(f,xs) {
    return xs.reduce(f);
}

var reduce = curry(reduce); // Pointfree reduce


function Router(routes) {
    if(this instanceof Router) {

    this.routes = mergeObj(routes);
    this.route = function() {
        var r = this.controller();
        r = isArr(r) || str(r);
        if (isArr(r)) {
            r = arrayOf(str)(r);
            return this.traverse(r, r.length - 1);
        }
        if (this.routes[r]) {
            return this.routes[r].root();
        } else if (r === "" || !this.routes[r]) {
            return this.routes.root(); // 404 route?
        }
    };
    this.controller = function() {
        var loc = location.hash.split('');
        loc.shift();
        if (loc.indexOf('/') === -1) {
            return loc = loc.join('');

        } else {
            return loc.join('').split('/');
        }
    };
    this.traverse = function traverse(routeArray, length, iter, o) {
        var head = [].slice.call(routeArray, 0, 1),
            tail = [].slice.call(routeArray, 1);
        var iter = iter || 0;
        var o = o || this.routes;
        if (iter === length) {
            return o[head[0]] ? o[head[0]]() : console.log('Error: Wrong Pathname.');
        }

        for (i in o) {
            if (head[iter] === String(i)) {
                console.log(o[i]);
                traverse(tail, length, ++iter, o[i]);
            }
        }

    };
    } else {
      return new Router(routes);
  }
}


// NEXT:
// MapWith, getWith <<-- Bound
// Improve memoize
// Map function that takes an array of methods as strings, and executes them on objects' keys Object.keys()

function toLower(a) {
    return a.toLowerCase();
}
function toUpper(a) {
    return a.toUpperCase();
}

function capitalise(a) {
	return concat(toUpper(head(a)),a.slice(1)); 
}

var toLower = curry(toLower), toUpper = curry(toUpper);

function concat(a,b) {
    return a.concat(b);
}

var concat = curry(concat);

function take(n,xs) {
    n = num(n);
    return xs.filter(function(e,i) { return i < n;})
}

var take =  curry(take); // Pointfree take

function User() { // Either for password
    this.username = null;
}

User.prototype.setUsername = function(name) {
    this.username = Maybe.of(name);
};
User.prototype.getUsernameMaybe = function(f) {
    return this.username.map(f);
};

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