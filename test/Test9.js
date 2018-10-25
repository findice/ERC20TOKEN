var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("9. Continuous transferFrom with one illegal", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "transferFrom", caller: 1, sender: 0, receiver: 1, payment: 100, succeed: false, on_error: "Illegal transfrom Performed" },
                      { block: 2, action: "approve",                 sender: 0, receiver: 1, payment: 100, succeed: true,  on_error: "1st Transaction Unsuccessful" },
                      { block: 3, action: "transferFrom", caller: 1, sender: 0, receiver: 2, payment: 50,  succeed: true,  on_error: "2nd Transfer Unsuccessful" },
                      { block: 4, action: "transferFrom", caller: 1, sender: 0, receiver: 2, payment: 60,  succeed: false, on_error: "Illegal TranferFrom Successful" },],
        });
    });
});
