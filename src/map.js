function map(f,xs) {

    return xs.map(f);
}

var map = curry(map); // Pointfree map 
