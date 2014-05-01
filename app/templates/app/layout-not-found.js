require('./view-app');<% if (!bare) { %>
require('./view-not-found');<% } %>

ns.layout.define('not-found', {

    <% if (bare) { %>'app': {}<% } else { %>'app': {
        'notFound': true
    }<% } %>

});
