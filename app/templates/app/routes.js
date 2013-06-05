(function(ns) {

    // Define routes for your application.
    // Note: last slashes are optional.
    ns.router.routes = {

        // Match route to page layout.
        route: {
            '/': 'main'
        },

        // Redirect given URLs.
        redirect: {
            '/index': '/'
        }

    };

}(ns));
