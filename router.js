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
    api: {
        root: function() {
            console.log('docs api');
        }
    },
    learning: {
        root: function() {
            console.log('learning route');
        }
    },
    contact: {
        root: function() {
            console.log('Sum');
        }
    }
};



var router = new Router([routes]),
    routeChange = bind(router.route, router);

router.route();

window.addEventListener('hashchange', routeChange, false);