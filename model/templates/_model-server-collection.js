'use strict';

/**
 * Returns <%= modelName %> instance data.
 * @param  {Object}   params   Model parameters
 * @param  {Function} callback
 */
module.exports = function(params, callback) {
    callback(null, {
        // Return either of two keys:
        //
        // - `data` containing collection of `<%= childModelName %>` data,
        // - `error` containing any data-connected errors.
        data: [
            {
                id: 0,
                model: '<%= childModelName %>'
            },
            {
                id: 1,
                model: '<%= childModelName %>'
            }
        ]
    });
};
