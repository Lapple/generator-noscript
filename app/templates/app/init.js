(function(ns) {

    ns.page.title = function(url) {
        return '<%= projectName %> ' + url;
    };

    $(function() {
        ns.init();
        ns.page.go();
    });

}(ns));
