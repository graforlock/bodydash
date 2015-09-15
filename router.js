var routes = {
    root: function() {
        console.log('home');
    },
    user: {
        root: function() {
            console.log('user route');
        },
        panel: function() {
            console.log('user panel');
        },
        register: function() {
            console.log('register route');

        }

    },
    contact: {
        root: function() {
            console.log('contact');
        }
    }

};



var router = new Router([routes]),
    routeChange = bind(router.route, router);

router.route();

window.addEventListener('hashchange', routeChange, false);