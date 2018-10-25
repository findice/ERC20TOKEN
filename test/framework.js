var BigNumber = require('bignumber.js');
var Registry = artifacts.require("./Registry.sol");
var Proxy = artifacts.require("./yProxy.sol");
//var UpgradeabilityProxy = artifacts.require("./UpgradeabilityProxy.sol");
var Upgradeable = artifacts.require("./Upgradeable.sol");
var Tokenv1 = artifacts.require("./ERC20Upgradeable.sol");
var abi = require('ethereumjs-abi');

// Run a test with the given accounts, done callback, and Tokens schema.
module.exports = function (accounts, done, schema) {
    var gasPrice = new BigNumber(15000000000);
    if (schema.gasPrice) {
        gasPrice = schema.gasPrice;
    }

    var gasAllocated = new BigNumber(21000).times(5);
    if (schema.gasAllocated) {
        gasAllocated = schema.gasAllocated;
    }

    var C;
    // Start the contract.
    switch (schema.type) {
        case "Tokenv1":
            C = Tokenv1;
            break;
        default:
            return error("Unknown contract type " + schema.type);
    }

    C.new(schema.reservePrice, {from: accounts[0]}).then(function (instance) {
        var nopaccount = accounts[accounts.length-1];

        // console.log("Before assigning action");
        // console.log(schema.action);
        var actions = schema.actions;
        var nonces = [];

        // console.log("Before logDetails");
        function logDetails(result) {
            var gasPrice = new BigNumber(web3.eth.gasPrice);
            var gasUsed = new BigNumber(result.receipt.gasUsed);

            console.log("gasPrice: " + gasPrice);
            console.log("gasUsed: " + gasUsed);
            console.log(gasPrice.times(gasUsed));
            console.log(result);
        }

        function error(message) {
            done(Error("Test: " + message));
        }

        function fail(action, message) {
            done(Error("Action " + action + ": " + message));
        }

        function print(accounts, c) {
            for (i = 0; i < c; i++) {
                //console.log("accounts[" + i + "]: " + accounts[i] + " " + web3.eth.getBalance(accounts[i]));
            }
        }


        // console.log("Before run");
        function run_(block, index) {
            // If we've run out of actions, the test has passed.
            // console.log("Checking actions completed");
            if (index >= actions.length) {
                done();
                return;
            }
            // console.log("Reached Here");
            var action = actions[index];
            var nextBlock = block + 1;
            var nextIndex = index + 1;
            // If the next action takes place in a future block, delay.
            if (action.block > block) {
                instance.nop({from: nopaccount}).then(function (result) {
                    run_(nextBlock, index);
                });
                return;
            }
            // If the next action takes place in a previous block, error.
            if (action.block != block) {
                return error("Current block is " + block + ", but action " + index +
                    " takes place in prior block " + action.block);
            }
            // If the next action is a callback, execute it.
            if (typeof(action.action) == "function") {
                var result = action.action();
                if (result) {
                    return fail(index, result);
                }
                // On successful evaluation of the callback, reinvoke ourselves.
                return run_(block, nextIndex);
            }

            //console.log("Running action: " + action.action);
            // Run the action and get a promise.
            var promise;
            var sender = accounts[action.sender];
            var receiver = accounts[action.receiver]
            var caller = accounts[action.caller]
            var owner = accounts[action.owner];
            var spender = accounts[action.spender];
            var nonce = nonces[action.account];
            print(accounts, 3);
            switch (action.action) {
                case "transfer":
                    promise = instance.transfer(receiver, action.payment, { from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                case "transferFrom":
                    // console.log("TransferFrom");
                    promise = instance.transferFrom(sender, receiver, action.payment, {from: caller, gasPrice: gasPrice, gas: gasAllocated});
                    break;
                case "pause":
                    // console.log("Pause");
                    promise = instance.pauseAllTransactions(action.pauseTransaction,{ from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                case "blacklist":
                    // console.log("blacklist");
                    promise = instance.blacklist(receiver, action.blacklist,{ from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                case "approve":
                    promise = instance.approve(receiver, action.payment,{ from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                case "allowance":
                    // console.log("allowance");
                    instance.allowance.call(owner, spender,{ from: sender, gasPrice: gasPrice, gas: gasAllocated }).then(function (value) {
                    //     // assert.equal(value.valueOf(), action.expectation, "Allowed value not equal to expected value");
                        console.log("Expectation: "+ action.expectation+" Actual: "+ value.valueOf());
                    });
                    promise = instance.allowance( owner, spender,{ from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                case "balanceOf":
                    // console.log("balanceOf");
                    instance.balanceOf.call(owner, { from:sender, gasPrice: gasPrice, gas: gasAllocated }).then(function (value) {
                            // assert.equal(value.valueOf(), action.expectation, "Allowed value not equal to expected value");
                            console.log("Expectation: "+ action.expectation+" Actual: "+ value.valueOf());
                        });
                    promise = instance.balanceOf(owner, { from:sender, gasPrice: gasPrice, gas: gasAllocated });
                    break;
                default:
                    return error("Unknown action " + action.action);
            }
            // Continue the computation after the promise.
            promise.then(function (result) {
                print(accounts, 3);
                if (!action.succeed) {
                    return fail(index, action.on_error);
                }

                if (action.post) {
                    action.post(result);
                }

                run_(nextBlock, nextIndex);

            }).catch(function (error) {
                print(accounts, 3);
                if (action.succeed) {
                    return fail(index, action.on_error + ": " + error.toString().replace(/^error: /i, ""));
                }


                if (action.post) {
                    action.post(error);
                }

                run_(nextBlock, nextIndex);
            });

        }

        // Start the contract.
        // console.log("Gonna start");
        run_(1, 0);
    });

}
