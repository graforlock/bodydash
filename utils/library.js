/*  CONTRACTS    *\
-------------------
\*  HOMOMORPHS   */

function str(s) {
    if (typeof s === 'string')
        return s;
    else
        throw new TypeError('Error: Input excepts String type');
}

function func(f) {
    if (typeof f === 'function')
        return f;
    else
        throw new TypeError('Error: Input excepts Function type');
}

function num(n) {
    if (typeof n === 'number')
        return n;
    else
        throw new TypeError('Error: Input excepts Number type');
}

function arr(a) {
    if ({}.toString.call(a) === '[object Array]')
        return a;
    else
        throw new TypeError('Error: Input excepts Array type');

}

function api(a) {
    if (a === 'api')
        return a;
    else
        throw new TypeError('Error: Expects an API route');
}

function isArr(a) {
    if ({}.toString.call(a) === '[object Array]')
        return a;
    else
        return false;

}

function obj(o) {
    if ({}.toString.call(o) === '[object Object]')
        return o;
    else
        throw new TypeError('Error: Input excepts Object type');
}

/* FUNCTORS    *\
-----------------
\* ARRAYOF     */

function arrayOf(c) {
    return function(a) {
        return arr(a).map(c);
    }
}

function objArr(o) {
    return arrayOf(obj)(o);
}

function extend(destination, source) {
    destination = obj(destination);
    source = obj(source);
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


function mergeObj(toExtend) {
    return objArr(toExtend)
        .map(function(e) {
            return extend({}, e)
        })
        .reduce(function(a, b) {
            return extend(a, b)
        });
}

/*  MONADS      *\
------------------
\*  MAYBES      */


function Maybe() {}

Maybe.prototype.orElse = function(y) {
    if (this instanceof Just)
        return this.x;
    else
        return y;
}

function None() {}

None.prototype = Object.create(Maybe.prototype);

None.prototype.toString = function() {
    return 'None';
}

function Just(x) { // Identity Monad
    return this.x = x;
}

Just.prototype = Object.create(Maybe.prototype);

Just.prototype.toString = function() {
    return 'Just ' + this.x;
}

function none() { // none is the default value (aka NULL)
    return new None();
}

function just(x) { // just is the modified value (aka SOMETHING)
    return new Just(x);
}

function maybe(m) {
    if (m instanceof None)
        return m;
    else if (m instanceof Just)
        return just(m.x);
    else
        throw new Error("Error: Just or None expected, but " + m.toString() + " given.");
}

function maybeOf(f) {
    return function(m) {
        if (m instanceof None)
            return m
        else if (m instanceof Just)
            return just(f(m.x));
        else
            throw new Error("Error: Just or None expected, but " + m.toString() + " given.");
    }
}

/*  MONADS  *\
--------------
\*  LENSES  */

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




function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
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


function extendData(target, data) {
    return extend(target, data);
}

function fcompose() {
    var funcs = arrayOf(func)([].slice.call(arguments));
    return function() {
        var fargs = arguments;
        for (var i = funcs.length - 1; i >= 0; i -= 1) {
            fargs = [funcs[i].apply(this, fargs)];
            console.log(fargs);
        }
        return fargs[0];
    }
}

function filter(event) {
    if (this.hasOwnProperty(event))
        return this[event]();
    else
        throw new Error(this.prototype.constructor.name + ': Property Not Found');
}

function flatten(array) {
    return arr(array).reduce(function(a, b) {
        return a.concat(b);
    });

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

function User() {
    this.username = none();
}
User.prototype.setUsername = function(name) {
    this.username = just(str(name));
};
User.prototype.getUsernameMaybe = function() {
    var usernameMaybe = curry(maybeOf(str));
    return usernameMaybe(this.username).orElse('anonymous');
};

function Router(routes) {
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
}