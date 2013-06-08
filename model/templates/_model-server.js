/**
 * Return <%= modelName %> instance.
 * @param  {Object}   params   Model parameters
 * @param  {Function} callback
 */
module.exports = function(params, callback) {
    callback(null, {
        // Return either of two keys:
        //
        // - `data` containing model information,
        // - `error` containing any data-connected errors.
        data: {
            model: '<%= modelName %>'
        }
    });
};
