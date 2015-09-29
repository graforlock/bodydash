var routes, router, routeChange;


routes = [api, contact, home, learning, user];

router = Router(routes);
routeChange = bind(router.route, router);


router.route();

window.addEventListener('hashchange', routeChange, false);	