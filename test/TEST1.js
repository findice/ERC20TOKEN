var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("1. creates a ERC20TokenV1", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [],
        });
    });

});
