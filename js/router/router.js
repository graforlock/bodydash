
var routes = [api,contact,home,learning,user];

var router = new Router(routes),
    routeChange = bind(router.route, router);

router.route();

window.addEventListener('hashchange', routeChange, false);