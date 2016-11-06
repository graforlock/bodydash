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
	    array       : __webpack_require__(1),
	    collections : __webpack_require__(7),
	    combinators : __webpack_require__(8),
	    container   : __webpack_require__(9),
	    contracts   : __webpack_require__(5),
	    curry       : __webpack_require__(2),
	    debug       : __webpack_require__(10),
	    either      : __webpack_require__(11),
	    identity    : __webpack_require__(14),
	    io          : __webpack_require__(15),
	    left        : __webpack_require__(12),
	    lens        : __webpack_require__(17),
	    lift        : __webpack_require__(18),
	    math        : __webpack_require__(19),
	    maybe       : __webpack_require__(6),
	    object      : __webpack_require__(4),
	    pointfree   : __webpack_require__(3),
	    right       : __webpack_require__(13),
	    string      : __webpack_require__(20),
	    seq         : __webpack_require__(21),
	    core        : __webpack_require__(16)
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//--->>> Arrays
	var curry = __webpack_require__(2),
	    map = __webpack_require__(3).map,
	    safeProp = __webpack_require__(4).safeProp;
	
	var array = {
	
	    map: map,
	
	    filter: curry(function (f, xs)
	    {
	        return xs.filter(f);
	    }),
	
	    reduce: curry(function (f, xs)
	    {
	        return xs.reduce(f);
	    }),
	
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
	            cb.apply(null, [array[i], i]);
	        }
	    }),
	
	    slice: [].slice
	
	};
	
	module.exports = array;


/***/ },
/* 2 */
/***/ function(module, exports) {

	//--->>> Curry/Partial Application
	
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

	var curry = __webpack_require__(2);
	
	var pointfree = {
	
	    map: curry(function (f, functor)
	    {
	        return functor.map(f);
	    }),
	
	    ap: curry(function (functor1, functor2)
	    {
	        return functor1.map(functor2.join());
	    }),
	
	    chain: curry(function(f, functor)
	    {
	        return functor.map(f).join();
	    })
	
	};
	
	module.exports = pointfree;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//--->>> Object utils
	var contracts = __webpack_require__(5),
	    curry = __webpack_require__(2),
	    Maybe = __webpack_require__(6);
	
	var object = {
	
	    extend: function extend(destination, source)
	    {
	        destination = contracts.obj(destination),
	        source = contracts.obj(source);
	
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
	
	    extendTwo: curry(function (a, b)
	    {
	        a = contracts.obj(a),
	        b = contracts.obj(b);
	        return [a, b].reduce(function (a, b)
	        {
	
	            for (var key in b)
	            {
	                a[key] = b[key];
	            }
	            return a;
	        }, {});
	    }),
	
	    extendMany: function (toExtend)
	    {
	        return contracts.objArr(toExtend)
	            .map(function (e)
	            {
	                return object.extend({}, e)
	            })
	            .reduce(function (a, b)
	            {
	                return object.extend(a, b)
	            });
	    },
	
	    newObj: function ()
	    {
	        return object.extend({}, {});
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
/* 5 */
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
	
	    unionOf: function(t)
	    {
	        t = contracts.strArr(t);
	        return function(a)
	        {
	            for(var i = 0; i < t.length; i++)
	            {
	                if({}.toString.call(a) === '[object ' + t[i] + ']')
	                {
	                    return a;
	                }
	            }
	            throw new TypeError('Error: Input excepts union of ' + t.join("|") );
	        }
	    },
	
	    AOUnion: function(ao)
	    {
	        return contracts.unionOf(['Array', 'Object'])(ao);
	    },
	
	    obj: function (o)
	    {
	        return contracts.classOf('Object')(o);
	    },
	
	    arr: function (a)
	    {
	        return contracts.classOf('Array')(a);
	    },
	
	    func: function (f)
	    {
	        return contracts.typeOf('function')(f);
	    },
	
	    num: function (n)
	    {
	        return contracts.typeOf('number')(n);
	    },
	
	    arrayOf: function (c)
	    {
	        return function (a)
	        {
	            return contracts.arr(a).map(c);
	        }
	    },
	
	    funcArr: function (a)
	    {
	        return contracts.arrayOf(contracts.func)(a);
	    },
	
	    numArr: function (a)
	    {
	        return contracts.arrayOf(contracts.num)(a);
	    },
	
	    strArr: function (a)
	    {
	        return contracts.arrayOf(contracts.str)(a);
	    },
	
	    objArr: function (a)
	    {
	        return contracts.arrayOf(contracts.obj)(a);
	    },
	
	    arrArr: function (a)
	    {
	        return contracts.arrayOf(contracts.arr)(a);
	    }
	};
	
	module.exports = contracts;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Maybe
	var curry = __webpack_require__(2);
	
	function Maybe(x)
	{
	    this.__value = x;
	}
	
	Maybe.maybe = curry(function (x, f, m)
	{
	    return m.isNone() ? None.of(x) : Just.of(f(m.__value));
	});
	
	Maybe.of = function (x)
	{
	    return new Maybe(x);
	};
	
	Maybe.prototype.isJust =function ()
	{
	    return this.constructor === Just;
	};
	
	Maybe.prototype.isNone = function ()
	{
	    return this.constructor === None;
	};
	
	Maybe.prototype.isNothing = function()
	{
	    return (this.__value === null || this.__value === undefined || this.__value !== this.__value);
	};
	
	Maybe.prototype.map = function (f)
	{
	    return this.isNothing() ? None.of(null) : Just.of(f(this.__value));
	};
	
	Maybe.prototype.join = function ()
	{
	    return this.isNone() ? None.of(null) : this.__value;
	};
	
	Maybe.prototype.ap = function (other)
	{
	    return other.map(this.__value);
	    // Functor requirement: It maps (other Functor's map) over current Functor's __value.
	};
	
	function Just(v)
	{
	    Maybe.call(this, v);
	    this.__value = v;
	}
	
	Just.of = function (v)
	{
	    return new Just(v);
	};
	
	Just.prototype = Object.create(Maybe.prototype);
	Just.prototype.constructor = Just;
	
	function None(v)
	{
	    Maybe.call(this, v);
	    this.__value = v;
	}
	
	None.of = function(v)
	{
	    return new None(v);
	};
	
	None.prototype = Object.create(Maybe.prototype);
	None.prototype.constructor = None;
	
	
	module.exports = Maybe;

/***/ },
/* 7 */
/***/ function(module, exports) {

	function Set(arr)
	{
	    this.set = [];
	
	    this.add = function ()
	    {
	        if (arguments.length)
	        {
	            var array = [].slice.call(arguments)[0],
	                temp = {};
	
	            for (var i = 0; i < array.length; i++)
	            {
	                temp[array[i]] = array[i];
	            }
	
	            for (var key in temp)
	            {
	                if (this.set.indexOf(temp[key]) === -1)
	                    this.set.push(temp[key]);
	            }
	        }
	        this.isClass();
	    }.bind(this);
	
	    this.isClass = function()
	    {
	        return this instanceof Set ? this : this.set;
	    };
	
	    this.add(arr);
	}
	
	Set.prototype.toMap = function ()
	{
	    this.set = this.set.reduce(function (a, b)
	    {
	        a[b] = b;
	        return a;
	    }, {});
	    return this.set;
	};
	
	module.exports = {
	    Set: Set
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	var combinators = {
	
	    K: function (a)
	    {
	        return function ()
	        {
	            return a;
	        }
	    },
	
	    S: function (a, b, c)
	    {
	        return a(c)(b(c))
	    },
	
	    I: function (a)
	    {
	        return a;
	    }
	
	};
	
	module.exports = combinators;

/***/ },
/* 9 */
/***/ function(module, exports) {

	//-->>> Container
	
	function Container(x)
	{
	    this.__value = x;
	}
	
	Container.of = function (x)
	{
	    return new Container(x);
	};
	
	Container.prototype.map = function (f)
	{
	    return Container.of(f(this.__value));
	};
	
	Container.prototype.ap = function (other)
	{
	    return other.map(this.__value);
	};
	
	Container.prototype.join = function()
	{
	    return this.__value;
	}
	
	
	module.exports = Container;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Debug
	var curry = __webpack_require__(2);
	
	function debug(tag,x) {
	        console.log(tag, x);
	        return x;
	}
	
	module.exports = curry(debug);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//--->> Either
	var curry = __webpack_require__(2),
	    Left = __webpack_require__(12),
	    Right = __webpack_require__(13);
	
	module.exports = curry(function(f /* identity in mose cases */, g, e) {
	     switch (e.constructor) { 
	        case Left: return f(e.__value); 
	        case Right: return g(e.__value); 
	    } 
	});

/***/ },
/* 12 */
/***/ function(module, exports) {

	//--->> Left
	
	function Left(x) {
	    this.__value = x;
	}
	
	Left.of = function(x) {
	    return new Left(x);
	};
	
	Left.prototype.map = function(f) {
	    return this;
	};
	
	module.exports = Left;

/***/ },
/* 13 */
/***/ function(module, exports) {

	//--->> Right
	
	function Right(x) {
	    this.__value = x;
	}
	
	Right.of = function(x) {
	    return new Right(x);
	};
	
	Right.prototype.map = function(f) {
	    return Right.of(f(this.__value));
	};
	
	module.exports = Right;


/***/ },
/* 14 */
/***/ function(module, exports) {

	function Identity(v)
	{
	    this.__value = v;
	}
	
	Identity.of = function (v)
	{
	    return new Identity(v);
	};
	
	Identity.prototype.map = function (f)
	{
	    return new Identity(f(this.__value));
	};
	
	Identity.prototype.ap = function (other)
	{
	    return other.map(this.__value);
	};
	
	Identity.prototype.join = function()
	{
	  return this.__value;
	};
	
	module.exports = Identity;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> I/O
	var compose = __webpack_require__(16).compose,
	    func = __webpack_require__(5).func,
	    debug = __webpack_require__(10),
	    head = __webpack_require__(1).head;
	
	function IO(f)
	{
	    f = func(f);
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
	    return new IO(compose(f, this.__value));
	};
	
	IO.prototype.emap = function (f)
	{
	    return this.chain(function (e)
	    {
	        return new IO(compose(e, f));
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
	    return new IO(compose(head, this.__value));
	};
	
	IO.prototype.chain = function (f)
	{
	    return this.map(f).join();
	};
	
	IO.prototype.ap = function (other)
	{
	    return other.map(this.join());
	};
	
	
	module.exports = IO;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> General Tools
	var contracts = __webpack_require__(5),
	    array = __webpack_require__(1),
	    Maybe = __webpack_require__(6),
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
	        var funcs = contracts.arrayOf(contracts.func)([].slice.call(arguments));
	        return function (arg)
	        {
	            return funcs.reverse().reduce(function (a, b)
	            {
	                return b(a);
	            }, arg);
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
	
	    flip: curry(function (fn, first, second)
	    {
	        return fn.call(this, second, first);
	    }),
	
	    flipMany: function (fn)
	    {
	        return function ()
	        {
	            var first = core.toArray(arguments);
	            return function ()
	            {
	                var second = core.toArray(arguments);
	                return fn.apply(this, array.concat(second, first));
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Lenses
	var Identity = __webpack_require__(14),
	    AOUnion = __webpack_require__(5).AOUnion,
	    compose = __webpack_require__(16).compose,
	    extend = __webpack_require__(4).extendTwo,
	    curry = __webpack_require__(2);
	
	
	var Lens = curry(function Lens(key, f, x)
	{
	    return compose(extend(x), f(key), extend({}))(x);
	});
	
	function lensAdapter(x)
	{
	    x = AOUnion(x);
	    if({}.toString.call(x) === '[object Object]')
	    {
	        return extend(x);
	    }
	    else {
	        return x;
	    }
	}
	
	var _get = curry(function get(key, obj)
	{
	    var object = obj;
	    object[key] = obj[key];
	    return object;
	});
	
	var get = function(lens, x) {
	    return compose(Identity.of, lens(_get))(x);
	};
	
	var set = function(lens, f, x) {
	    return compose(Identity.of, lens(f))(x);
	};
	
	
	module.exports = {get: get, set: set, Lens: Lens};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//-->>> Lift
	var curry = __webpack_require__(2);
	
	var lift = {
	
	    liftA1: curry(function(f, functor)
	    {
	        return functor.map(f);
	    }),
	
	    liftA2: curry(function (f, functor1, functor2)
	    {
	        return functor1.map(f).ap(functor2);
	    }),
	
	    liftA3: curry(function (f, functor1, functor2, functor3)
	    {
	        return functor1.map(f).ap(functor2).ap(functor3);
	    }),
	
	    liftA4: curry(function (f, functor1, functor2, functor3, functor4)
	    {
	        return functor1.map(f).ap(functor2).ap(functor3).ap(functor4);
	    })
	
	};
	
	module.exports = lift;

/***/ },
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//--->>> Lazy Sequence
	var compose = __webpack_require__(16).compose,
	    func = __webpack_require__(5).func,
	    curry = __webpack_require__(2);
	
	function Seq(f)
	{
	    f = func(f);
	    this.__value = f;
	    this.take = curry(function (num, f)
	    {
	        var list = [];
	        for (var i = 1; i <= num; i++)
	        {
	            list.push(f);
	        }
	        return new Seq(function ()
	        {
	            return compose.apply(null, list)(this.__value());
	        }.bind(this));
	    }.bind(this));
	}
	
	Seq.of = function (f)
	{
	    return new Seq(function ()
	    {
	        return f;
	    });
	};
	
	Seq.prototype.map = function (f)
	{
	    return new Seq(compose(f, this.__value));
	};
	
	Seq.prototype.ap = function (other)
	{
	    return other.map(this.__value());
	};
	
	Seq.prototype.join = function()
	{
	    return this.__value();
	};
	
	module.exports = Seq;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=bodydash.umd.js.map