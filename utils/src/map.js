function map(f,xs) {

    return xs.toString() === '[object NodeList]' ? each(f,xs) : xs.map(f);
}

var map = curry(map); // Pointfree map 
