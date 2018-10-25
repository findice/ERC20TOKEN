var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("7. Blacklisted not allowed to do transaction", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "transfer",   sender: 0, receiver: 1, payment: 100,     succeed: true,  on_error: "Admin Transaction Unsuccessful" },
                      { block: 2, action: "transfer",   sender: 1, receiver: 2, payment: 50,      succeed: true,  on_error: "Not Blacklisted transaction Unsuccessful" },
                      { block: 3, action: "blacklist",  sender: 0, receiver: 1, blacklist: true,  succeed: true,  on_error: "Blacklist Unsuccessful" },
                      { block: 4, action: "transfer",   sender: 1, receiver: 2, payment: 10,      succeed: false, on_error: "Blacklisted person was allowed to do transaction" },],
        });
    });

});
