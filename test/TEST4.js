var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("4. Approval", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        5000,
            actions: [{ block: 1, action: "approve", sender: 0, receiver: 1, payment: 100, succeed: true, on_error: "Approval Unsuccessfully" },],
        });
    });

});
