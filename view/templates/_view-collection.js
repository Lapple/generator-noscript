ns.ViewCollection.define('<%= viewName %>', {
    models: [],
    split: {
        view_id: '<%= subviewName %>'
    },
    events: {
        // <%= viewName %> events...
    },
    methods: {
        // <%= viewName %> prototype methods...
    }
});
