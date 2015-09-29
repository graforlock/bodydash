function debug(tag) {
    tag = tag || "Debugger: "
    return function(x) {
        console.log(tag, x);
        return x;
    }
}