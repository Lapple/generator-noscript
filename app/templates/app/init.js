(function(ns) {

    if ($) {
        $(init);
    } else {
        document.addEventListener('DOMContentLoaded', init, false);
    }

    function init() {
        ns.init();
        ns.page.go();
    }

}(ns));
