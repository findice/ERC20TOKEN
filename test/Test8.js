var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("8. Continuous Transactions with one illegal", function (done) {
        run(accounts, done, {
            type:               "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "transfer", sender: 0, receiver: 1, payment: 100, succeed: true,  on_error: "1st Transaction Unsuccessful" },
                      { block: 2, action: "transfer", sender: 1, receiver: 2, payment: 50,  succeed: true,  on_error: "2nd Transfer Unsuccessful" },
                      { block: 3, action: "transfer", sender: 1, receiver: 2, payment: 50,  succeed: true,  on_error: "3rd Transfer Unsuccessful" },
                      { block: 4, action: "transfer", sender: 1, receiver: 2, payment: 50,  succeed: true,  on_error: "4th illegal Transfer UnSuccessful" },
                     ],
        });
    });
});
