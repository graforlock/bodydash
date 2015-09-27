function memoize(fn,keymaker) {
    var lookup = {}, key;

    keymaker || (keymaker = function(args) {
        return JSON.stringify(args);
    });
    return function() {
        var key =  keymaker.call(this,arguments);

        return lookup[key] || (lookup[key] = fn.apply(this, arguments));
    }
}
