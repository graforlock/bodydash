(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("bodydash", [], factory);
	else if(typeof exports === 'object')
		exports["bodydash"] = factory();
	else
		root["bodydash"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    array: __webpack_require__(1),
	    container: __webpack_require__(6),
	    contracts: __webpack_require__(4),
	    debug: __webpack_require__(7),
	    either: __webpack_require__(8),
	    io: __webpack_require__(9),
	    lens: __webpack_require__(11),
	    lift: __webpack_require__(12),
	    math: __webpack_require__(13),
	    maybe: __webpack_require__(5),
	    object: __webpack_require__(3),
	    string: __webpack_require__(14),
	    take: __webpack_require__(15),
	    utils: __webpack_require__(10)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//--->>> Arrays
	var curry = __webpack_require__(2),
	    safeProp = __webpack_require__(3).safeProp;
	
	var array = {
	
	    map: curry(function (f, xs)
	    {
	
	        return xs.map(f);
	    }),
	
	    filter: curry(function (f, xs)
	    {
	        return xs.filter(f);
	    }),
	
	    reduce: function (f, xs)
	    {
	        return xs.reduce(f);
	    },
	
	    head: function (xs)
	    {
	        return xs[0];
	    },
	
	    safeHead: safeProp(0),
	
	    last: function (xs)
	    {
	        return xs[xs.length - 1];
	    },
	
	    each: curry(function (cb, array)
	    {
	        for (var i = 0; i < array.length; i++)
	        {
	            cb.call(null, array[i]);
	        }
	    }),
	
	    slice: [].slice
	
	};
	
	module.exports = array;


/***/ },
/* 2 */
/***/ function(module, exports) {

	function curry(fn)
	{
	    var arity = fn.length;
	    return getArgs([]);
	
	    function getArgs(totalArgs)
	    {
	        return function stepTwo()
	        {
	            var nextTotalArgs = totalArgs.concat([].slice.call(arguments, 0));
	            if (nextTotalArgs.length >= arity)
	                return fn.apply(this, nextTotalArgs);
	            else
	                return getArgs(nextTotalArgs);
	        }
	    }
	}
	
	module.exports = curry;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//--->>> Object utils
	var contracts = __webpack_require__(4),
	    curry = __webpack_require__(2),
	    Maybe = __webpack_require__(5);
	
	var object = {
	
	    extend: function (destination, source)
	    {
	        for (var property in source)
	        {
	            if (source[property] && source[property].constructor &&
	                source[property].constructor === Object)
	            {
	                destination[property] = destination[property] || {};
	                extend(destination[property], source[property]);
	            } else
	            {
	                destination[property] = source[property];
	            }
	        }
	        return destination;
	    },
	
	    extendData: function (target, data)
	    {
	        return object.extendObj(target, data);
	    },
	
	    extendObj: function (destination, source)
	    {
	        return object.extend(contracts.obj(destination), contracts.obj(source));
	    },
	
	    mergeObj: function (toExtend)
	    {
	        return contracts.objArr(toExtend)
	            .map(function (e)
	            {
	                return object.extendObj({}, e)
	            })
	            .reduce(function (a, b)
	            {
	                return object.extendObj(a, b)
	            });
	    },
	
	    newObj: function ()
	    {
	        return object.extendObj({}, {});
	    },
	
	    immutable: function (o)
	    {
	        o = contracts.obj(o);
	        return Object.freeze(o);
	    },
	
	    inProto: function (o, name)
	    {
	        return name in o && !o.hasOwnProperty(name);
	    },
	
	    hasOwn: function (o, name)
	    {
	        return !object.inProto(o, name);
	    },
	
	    prop: curry(function (key, obj)
	    {
	        return obj[key];
	    }),
	
	    safeProp: curry(function (x, o)
	    {
	        return new Maybe(o[x]);
	    }),
	
	    protoOf: function (o)
	    {
	        return Object.getPrototypeOf(o);
	    }
	
	};
	
	
	module.exports = object;

/***/ },
/* 4 */
/***/ function(module, exports) {

	//--->> Contracts
	
	var contracts = {
	
	    str: function (s)
	    {
	        if (typeof s === 'string')
	            return s;
	        else
	            throw new TypeError('Error: Input excepts String type');
	    },
	
	    classOf: function (s)
	    {
	        s = contracts.str(s);
	        return function (a)
	        {
	            if ({}.toString.call(a) === '[object ' + s + ']')
	                return a;
	            else
	                throw new TypeError('Error: Input excepts ' + s + ' type');
	        }
	    },
	
	    typeOf: function (s)
	    {
	        s = contracts.str(s);
	        return function (v)
	        {
	            if (typeof v === s)
	                return v;
	            else
	                throw new TypeError('Error: Input excepts ' + s + ' type');
	        }
	    },
	
	    obj: function (o)
	    {
	        return utils.classOf('Object')(o);
	
	    },
	
	    arr: function (a)
	    {
	        return utils.classOf('Array')(a);
	    },
	
	    func: function (f)
	    {
	        return utils.typeOf('function')(f);
	    },
	
	    num: function (n)
	    {
	        return utils.typeOf('number')(n);
	    },
	
	    id: function (x)
	    {
	        return x;
	    },
	
	    isArr: function (a)
	    {
	        if ({}.toString.call(a) === '[object Array]')
	            return a;
	        else
	            return false;
	    },
	
	    arrayOf: function (c)
	    {
	        return function (a)
	        {
	            return utils.arr(a).map(c);
	        }
	    },
	
	    funcArr: function (a)
	    {
	        return utils.arrayOf(utils.func)(a);
	    },
	
	    numArr: function (a)
	    {
	        return utils.arrayOf(utils.num)(a);
	    },
	
	    strArr: function (a)
	    {
	        return utils.arrayOf(utils.str)(a);
	    },
	
	    objArr: function (a)
	    {
	        return utils.arrayOf(utils.obj)(a);
	    },
	
	    arrArr: function (a)
	    {
	        return utils.arrayOf(utils.arr)(a);
	    }
	};
	
	module.exports = contracts;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Maybe
	var curry = __webpack_require__(2);
	
	function Maybe(x)
	{
	    this.__value = x;
	}
	
	Maybe.maybe = curry(function (x, f, m)
	{
	    return m.isNothing() ? x : f(m.__value);
	    // Maybe helper for custom value (instead of 'null')
	});
	
	Maybe.of = function (x)
	{
	    return new Maybe(x);
	};
	
	Maybe.prototype.isNothing = function ()
	{
	    return (this.__value === null || this.__value === undefined || this.__value !== this.__value);
	};
	
	Maybe.prototype.map = function (f)
	{
	    return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
	};
	
	Maybe.prototype.join = function ()
	{
	    return this.isNothing() ? Maybe.of(null) : this.__value;
	};
	
	Maybe.prototype.ap = function (other)
	{
	    return other.map(this.__value);
	    // Functor requirement: It maps (other Functor's map) over current Functor's __value.
	};
	
	
	module.exports = Maybe;

/***/ },
/* 6 */
/***/ function(module, exports) {

	//-->>> Container
	
	function Container(x) {
	    this.__value = x;
	}
	
	Container.of = function(x) {
	    return new Container(x);
	};
	
	Container.prototype.map = function(f) {
	    return Container.of(f(this.__value));
	};
	
	module.exports = Container;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Debug
	var curry = __webpack_require__(2);
	
	function debug(tag,x) {
	        console.log(tag, x);
	        return x;
	}
	
	module.exports = curry(debug);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//--->> Either
	var curry = __webpack_require__(2);
	
	function Left(x) {
	    this.__value = x;
	}
	
	Left.of = function(x) {
	    return new Left(x);
	};
	
	Left.prototype.map = function(f) {
	    return this;
	};
	
	function Right(x) {
	    this.__value = x;
	}
	
	Right.of = function(x) {
	    return new Right(x);
	};
	
	Right.prototype.map = function(f) {
	    return Right.of(f(this.__value));
	};
	
	module.exports = curry(function(f /* identity in mose cases */, g, e) {
	     switch (e.constructor) { 
	        case Left: return f(e.__value); 
	        case Right: return g(e.__value); 
	    } 
	});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> I/O
	var utils = __webpack_require__(10),
	    debug = __webpack_require__(7),
	    array = __webpack_require__(1);
	
	function IO(f)
	{
	    this.__value = f;
	}
	
	IO.of = function (x)
	{
	    return new IO(function ()
	    {
	        return x;
	    });
	};
	
	IO.prototype.map = function (f)
	{
	    return new IO(utils.compose(f, this.__value));
	};
	
	IO.prototype.emap = function (f)
	{
	    /* 'f' needs to be curried
	       var value = this.__value; <- value to pass over?
	     */
	    return this.chain(function (e)
	    {
	        return new IO(utils.compose(e.__value, f));
	        // it will lose I/O; has to be some means to prevent it
	    });
	};
	
	
	IO.prototype.join = function ()
	{
	    return this.__value();
	};
	
	IO.prototype.log = function ()
	{
	    var f = this.__value;
	    return f(debug(': '));
	};
	
	IO.prototype.do = function (fun)
	{
	    var f = this.__value;
	    this.__value()(fun);
	    return new IO(f);
	};
	
	IO.prototype.first = function ()
	{
	    return new IO(utils.compose(head, this.__value));
	};
	
	
	IO.prototype.delay = function (time)
	{
	    f = this.__value;
	    setTimeout(function ()
	    {
	        return f();
	    }, time);
	};
	
	IO.prototype.output = function ()
	{
	    return this.__value();
	};
	
	
	IO.prototype.chain = function (f)
	{
	    return this.map(f).join();
	};
	
	IO.prototype.each = function (f)
	{
	    return new IO(array.each(f, this.__value()));
	};
	
	IO.prototype.ap = function (other)
	{
	    return other.map(this.__value()); // Function requirement
	};
	
	
	module.exports = IO;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> General Tools
	var contracts = __webpack_require__(4),
	    Maybe = __webpack_require__(5),
	    curry = __webpack_require__(2);
	
	var core = {
	    bind: function (fn, context)
	    {
	        return function ()
	        {
	            return fn.apply(context, arguments);
	        }
	    },
	    compose: function ()
	    {
	        var funcs = core.arrayOf(core.func)([].slice.call(arguments));
	        return function ()
	        {
	            var fargs = arguments;
	            for (var i = funcs.length - 1; i >= 0; i -= 1)
	            {
	                fargs = [funcs[i].apply(this, fargs)];
	            }
	            return fargs[0];
	        }
	    },
	    mcompose: function (f, g)
	    {
	        return core.compose(core.chain(f), core.chain(g));
	    },
	    flatten: function (array)
	    {
	        return contracts.arr(array).reduce(function (a, b)
	        {
	            return a.concat(b);
	        });
	    },
	
	    flip: function (fn)
	    {
	        return function (first)
	        {
	            return function (second)
	            {
	                return fn.call(this, second, first);
	            };
	        };
	    },
	    flipMany: function (fn)
	    {
	        return function ()
	        {
	            var first = core.toArray(arguments);
	            return function ()
	            {
	                var second = core.toArray(arguments);
	                return fn.apply(this, concat(second, first));
	            };
	        };
	    },
	    join: function (monad)
	    {
	        return monad.join();
	    },
	    chain: curry(function (f, m)
	    {
	        return m.map(f).join();
	    }),
	    variadic: function (fn)
	    {
	        if (fn.length < 1) return fn;
	
	        return function ()
	        {
	            var ordinaryArgs = (1 <= arguments.length ?
	                    core.slice.call(arguments, 0, fn.length - 1) : []),
	                restOfTheArgsList = slice.call(arguments, fn.length - 1),
	                args = (fn.length <= arguments.length ?
	                    ordinaryArgs.concat([restOfTheArgsList]) : []);
	
	            return fn.apply(this, args);
	        }
	    },
	    toArray: function (array)
	    {
	        return [array];
	    },
	    safeArray: function (array)
	    {
	        return new Maybe([].slice.call(array));
	    }
	};
	
	module.exports = core;
	


/***/ },
/* 11 */
/***/ function(module, exports) {

	//-->>> Lenses
	
	function lens(set, get)
	{
	    var f = function (a)
	    {
	        return get(a);
	    };
	    f.set = set;
	    f.get = function (a)
	    {
	        return get(a);
	    };
	    f.modify = function (func, a)
	    {
	        return set(a, f(get(a)));
	    };
	    return f;
	}
	
	module.exports = lens;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Lift
	var curry = __webpack_require__(2);
	
	var lift = {
	
	    liftA2: curry(function (f, functor1, functor2)
	    {
	        return functor1.map(f).ap(functor2);
	    }),
	
	    liftA3: curry(function (f, functor1, functor2, functor3)
	    {
	        return functor1.map(f).ap(functor2).ap(functor3);
	    }),
	
	    liftA4: curry(function (f, functor1, functor2, functor3)
	    {
	        return functor1.map(f).ap(functor2).ap(functor3);
	    })
	
	};
	
	module.exports = lift;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Math add-ons
	var curry = __webpack_require__(2);
	
	var math = {
	
	    add: curry(function(x, y)
	    {
	        return x + y;
	    }),
	
	    subtract: curry(function(x, y)
	    {
	        return x - y;
	    }),
	
	    times: curry(function(x, y)
	    {
	        return x * y;
	    }),
	
	    divide: curry(function(x, y)
	    {
	        return x / y;
	    }),
	
	    square: function(x)
	    {
	        return x * x;
	    },
	
	    cube: function(x)
	    {
	        return math.square(x) * x;
	    },
	
	    plusplus: function(x)
	    { // Necessity: you can't pass ++ to the map
	        return ++x;
	    },
	
	    minusminus: function(x)
	    { // Necessity: you can't pass -- to the map
	        return --x;
	    },
	
	    rand: function(x)
	    {
	        return Math.floor(Math.random() * x) + 1;
	    }
	
	};
	
	module.exports = math;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> String add-ons
	var curry = __webpack_require__(2),
	    head = __webpack_require__(1).head;
	
	var string = {
	
	    toLower: function(a)
	    {
	        return a.toLowerCase();
	    },
	
	    toUpper: function(a)
	    {
	        return a.toUpperCase();
	    },
	
	    capitalise: function(a)
	    {
	        return string.concat(string.toUpper(head(a)), a.slice(1));
	    },
	
	    concat: curry(function(a, b)
	    {
	        return a.concat(b);
	    })
	
	};
	
	module.exports = string;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Lazy add-ons
	var num = __webpack_require__(4).num,
	    curry = __webpack_require__(10).curry;
	
	var lazy = {
	
	    take: curry(function(n, xs)
	    {
	        n = num(n);
	        return xs.filter(function (e, i)
	        {
	            return i < n;
	        })
	    }),
	
	    skip: curry(function(n, xs)
	    {
	        n = num(n);
	        return xs.filter(function (e, i)
	        {
	            return i > n
	        });
	    })
	
	};
	
	module.exports = lazy;
	
	
	


/***/ }
/******/ ])
});
;
//# sourceMappingURL=bodydash.umd.js.map