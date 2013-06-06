(function(ns) {

    if ($) {
        $(init);
    } else {
        document.addEventListener('DOMContentLoaded', init, false);
    }

    function init() {
        ns.init();

        // Firefox does not trigger popstate on page load.
        ns.page.go();
    }

}(ns));