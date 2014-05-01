module.exports = function() {
    ns.page.title = function(url) {
        return '<%= projectName %> ' + url;
    };

    ns.init();

    return ns.page.go();
};
