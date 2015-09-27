
var routes = [api,contact,home,learning,user];

// var b_d = b_d();

// var and = b_d().router(routes);


// // var router = b_d(routes).route();
var router = Router(routes),
	routeChange = bind(router.route, router);
// var routeChange = bind(b_d().router(routes).route, b_d().router(routes));

router.route();

window.addEventListener('hashchange', routeChange, false);