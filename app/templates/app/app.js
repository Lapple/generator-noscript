require('./layout-main');
require('./layout-not-found');

// Defines routes and redirects.
ns.router.routes = {

    // Match route to page layout.
    // NOTE: last slashes are optional.
    route: {
        '/': 'main'
    },

    // Redirect given URLs.
    redirect: {
        '/index': '/'
    }

};

// Initialize on DOM ready.
$(require('./init'));
