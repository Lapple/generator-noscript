ns.layout.define('not-found', {

    <% if (bare) { %>'app': {}<% } else { %>'app': {
        'notFound': true
    }<% } %>

});
