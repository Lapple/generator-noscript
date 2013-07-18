/**
 * Return <%= modelName %> instance.
 * @param  {Object}   params   Model parameters
 * @param  {Function} callback
 */
module.exports = function(params, callback) {
    callback(null, {
        // Return either of two keys:
        //
        // - `data` containing collection of `<%= submodelName %>` data,
        // - `error` containing any data-connected errors.
        data: [
            {
                id: 0,
                model: '<%= submodelName %>'
            },
            {
                id: 1,
                model: '<%= submodelName %>'
            }
        ]
    });
};
