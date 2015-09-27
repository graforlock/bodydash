

function Router(routes) {
    if(this instanceof Router) {

    this.routes = mergeObj(routes);
    this.route = function() {
        var r = this.controller();
        r = isArr(r) || str(r);
        if (isArr(r)) {
            r = arrayOf(str)(r);
            return this.traverse(r, r.length - 1);
        }
        if (this.routes[r]) {
            return this.routes[r].root();
        } else if (r === "" || !this.routes[r]) {
            return this.routes.root(); // 404 route?
        }
    };
    this.controller = function() {
        var loc = location.hash.split('');
        loc.shift();
        if (loc.indexOf('/') === -1) {
            return loc = loc.join('');

        } else {
            return loc.join('').split('/');
        }
    };
    this.traverse = function traverse(routeArray, length, iter, o) {
        var head = [].slice.call(routeArray, 0, 1),
            tail = [].slice.call(routeArray, 1);
        var iter = iter || 0;
        var o = o || this.routes;
        if (iter === length) {
            return o[head[0]] ? o[head[0]]() : console.log('Error: Wrong Pathname.');
        }

        for (i in o) {
            if (head[iter] === String(i)) {
                console.log(o[i]);
                traverse(tail, length, ++iter, o[i]);
            }
        }

    };
    } else {
      return new Router(routes);
  }
}


// NEXT:
// MapWith, getWith <<-- Bound
// Improve memoize
// Map function that takes an array of methods as strings, and executes them on objects' keys Object.keys()
