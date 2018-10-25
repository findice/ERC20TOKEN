var BigNumber = require('bignumber.js');
var run = require('./framework.js');

contract('ERC20Upgradeable', function (accounts) {

    it("3. Transfer of Illegal Tokens", function (done) {
        run(accounts, done, {
            type:                "Tokenv1",
            reservePrice:        500,
            actions: [{ block: 1, action: "transfer", sender: 1, receiver: 2, payment: 10, succeed: false, on_error: "Illegal transaction was allowed" },],
        });
    });
});
