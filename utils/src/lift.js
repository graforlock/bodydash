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