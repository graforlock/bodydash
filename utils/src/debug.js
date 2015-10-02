function debug(tag,x) {
        console.log(tag, x);
        return x;
}

var debug = curry(debug);