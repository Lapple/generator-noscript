ns.layout.define('main', {

    // The `app` view should serve as a root of
    // any layout.
    <% if (bare) { %>'app': {}<% } else { %>'app': {
        'welcome': true
    }<% } %>

    // Sample layout:
    //
    //     'app': {
    //         'header': true,
    //         'sidebar@': {
    //             'news': true
    //         },
    //         'footer': true
    //     }
    //

});
