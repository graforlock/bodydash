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