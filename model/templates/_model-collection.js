require('./<%= childModelFileName %>');

module.exports = ns.Model.define('<%= modelName %>', {
    params: {},
    split: {
        model_id: '<%= childModelName %>',
        items: '.',
        params: {}
    },
    methods: {
        // <%= modelName %> prototype methods...
    }
});
