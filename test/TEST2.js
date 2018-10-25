var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("2. Transfer of Legal token", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "transfer", sender: 0, receiver: 1, payment: 10, succeed: true, on_error: "Transfer Unsuccessfully" },],
        });
    });

});
