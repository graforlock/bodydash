/*  CONTRACTS    *\
-------------------
\*  HOMOMORPHS   */


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
            throw new TypeError('Error: Input excepts ' + s +' type');
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

//------------------------------//

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

function inProto(o,name) {
    return name in object && !o.hasOwnProperty(name);
}
function hasOwn(o, name) {
    return !inProto(o,name);
}

function protoOf(o) {
    return Object.getPrototypeOf(o);
}

/* FUNCTORS    *\
-----------------
\* ARRAYS      */

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
function extendObj(destination, source) {
    return extend(obj(destination), obj(source));
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

function flatten(array) {
    return arr(array).reduce(function(a, b) {
        return a.concat(b);
    });

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

/* FUNCTORS    *\
-----------------
\* FUNCTIONS   */

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

/* PARTIAL APPLICATION *\
-------------------------
\*  DEFINITE ARITY     */   

function bind(fn, context) {
    return function() {
        return fn.apply(context, arguments);
    }
}

/* CURRYING           *\
------------------------
\*  INDEFINITE ARITY  */  

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

/* I/O                    *\
----------------------------
\*  TWO WAY DATA BINDING  */  


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
    return extendObj(target, data);
}

function filter(event) {
    event = event.toLowerCase();
    if (this.hasOwnProperty(event))
        return this[event]();
    else
        throw new Error(this.constructor.name + ': Property "' + event +'" Not Found on the Object');
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



function b_d(data) {


        if(data && typeof data === 'function') {
            return new Stream(data);
        }

        function Stream(step) {
            var next = step;
                return function(prev) {
                    if(!prev) {
                        return next.apply(this, arguments);
                    }
                    return prev.call(this, next.apply(this,arguments));
                }
        }
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
                        return this.routes[r].root;
                    } else if (r === "" || !this.routes[r]) {
                            return extend(this, {
                                next: new Stream(this.routes.root) // or new b_d() ?
                            } );
                                // super: this // How can i mix in this thing again from the inside?
                            

                       // return {
                       //       get: get(this.routes.root)

                       // };
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
                        return o[head[0]] ? o[head[0]] : console.log('Error: Wrong Pathname.');
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

    return {
        router: Router
    };

}

// Function.prototype.sequence = function(prev) {
//     var next = this;
//     return function() {
//         return prev.call(this, next.apply(this,arguments));
//     }
// }

// BLUEPRINTS
/* b_d.route('home')
       .view(home)
       .events('fetched')
       .get(url)
       .to(divDest);

   b_d.route('home/post')
       .view(post)
       .events('post')
       .post(url)
       .and()
       .goto('home/posted');
*/


/* HELPERS/UTILITIES *\
-----------------------
\*                   */

function newObj() {
    return extendObj({},{});
}

function ajax() {
    return new XMLHttpRequest();
}

function immutable(o) {
    o = obj(o);
    return Object.freeze(o);
}


// var bd = {
//     route: Router,
//     event: Events
// }

// function memoize(f) {
//     var cache = {};

//     return function() {
//         var arg_str = JSON.stringify(arguments);
//         cache[arg_str] = cache[arg_str] || f.apply(f, arguments);
//         return cache[arg_str];
//     }
// }

// NEXT:
// MapWith, getWith
// Working variadic
// Improve memoize
// Map function that takes an array of methods as strings, and executes them on objects' keys Object.keys()
