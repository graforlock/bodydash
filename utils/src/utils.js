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

function debug(tag) {
    tag = tag || "Debugger: "
    return function(x) {
        console.log(tag, x);
        return x;
    }
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


function pipe() { 
    var funcs, fargs, fcount = 0;

        console.log(funcs);
        [].slice.call(arguments).map(function(e) {
            if(typeof e === 'function')
                fcount += 1;
        })
        funcs = [].slice.call(arguments,0,fcount);
        fargs = [].slice.call(arguments,fcount);
        for (var i = 0; i < funcs.length;i++) {
            fargs = [funcs[i].apply(this, fargs)];
        }
        if(fargs[0]) { var flipped = flip(pipe)(fargs[0]) };
        return {
            pipe: flipped,
            exec: function(func) {
                return func(fargs[0]);
            }

        }
}


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

function toArray(arr) {
    return [].slice.call(arr);
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

function prop(obj,key) {
    return obj[key];
}

function protoOf(o) {
    return Object.getPrototypeOf(o);
}

var prop = curry(prop);

//--->>> Arrays

function head(xs) {
    return xs[0];
}

function last(xs) {
    return xs[xs.length-1];
}

var slice = Array.prototype.slice;