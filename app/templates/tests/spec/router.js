describe('Router', function() {
    it('should match `/` to `main` layout', function() {
        expect(ns.router('/').page).to.equal('main');
    });

    it('should redirect from `/index` to `/`', function() {
        expect(ns.router('/index').redirect).to.equal('/');
    })
});
