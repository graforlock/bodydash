
var routes = [api,contact,home,learning,user];


var and = b_d.router(routes);


// var router = b_d(routes).route();
var routeChange = bind(b_d.router(routes).route, b_d.router(routes));

// router.route();

window.addEventListener('hashchange', routeChange, false);