ns.ViewCollection.define('<%= viewName %>', {
    models: [],
    split: {
        view_id: '<%= childViewName %>'
    },
    events: {
        // <%= viewName %> events...
    },
    methods: {
        // <%= viewName %> prototype methods...
    }
});
