var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("6. Pause Transaction Test", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "pause",    sender: 0, pauseTransaction: true,   succeed: true,  on_error: "Transaction Paused" },
                      { block: 2, action: "transfer", sender: 0, receiver: 2, payment: 10, succeed: false, on_error: "Paused transaction was allowed" },],
        });
    });

});
