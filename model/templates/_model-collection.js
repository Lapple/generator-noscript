ns.Model.define('<%= modelName %>', {
    params: {},
    split: {
        model_id: '<%= submodelName %>',
        items: '.',
        params: {}
    },
    methods: {
        // <%= modelName %> prototype methods...
    }
});
