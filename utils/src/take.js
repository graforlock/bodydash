
function take(n,xs) {
    n = num(n);
    return xs.filter(function(e,i) { return i < n;})
}

var take =  curry(take); // Pointfree take