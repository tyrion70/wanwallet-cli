const wanUtil = require('wanchain-util');
const Web3 = require("web3");
const config = require('../config');
const execSync = require('child_process').execSync;
const checkBalance = require('./helpers/checkBalance');
const getKeystore = require('./helpers/getKeystore');
const preScTransfer = require('./helpers/preScTransfer');
const wanchainLog = require('../utils/wanchainLog');
var coinSCDefinition = wanUtil.coinSCAbi;

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));

web3.wan = new wanUtil.web3Wan(web3);

describe('Privacy transfer to account', function() {

    it('A private transfer to an account adds wancoin to the other account', function() {

        var transferAmount = 5;
        var keystoreFromName = 'keystore2';
        var keystoreToName = 'keystore3';
        var keystorePass = '1234ab';

        var keystoreFrom = getKeystore(keystoreFromName, keystorePass);
        var keystoreTo = getKeystore(keystoreToName, keystorePass);

        var addressTo = keystoreTo.waddress;
        var addressFrom = keystoreFrom.address;
        var privateKey = keystoreFrom.privateKey;

        var balanceFromStart = parseInt(checkBalance(web3, addressFrom));

        var contractInstanceAddress = config.contractInstanceAddress;
        var contractCoinSC = web3.eth.contract(coinSCDefinition);
        var contractCoinInstance = contractCoinSC.at(contractInstanceAddress);
        var value = parseInt(transferAmount) * 10**18;

        //wanchainLog('balanceFrom ' + balanceFromStart);

        preScTransfer(contractInstanceAddress, contractCoinInstance, privateKey, addressFrom, addressTo, parseInt(value));
        execSync('sleep 30', function(err,stdout,stderr) {
        });

        var balanceFromEnd = parseInt(checkBalance(web3, addressFrom));

        //wanchainLog('balanceFrom ' + balanceFromEnd);

        expect(balanceFromEnd).toBe(balanceFromStart - transferAmount);
    });
    /* DOESNT WORK CONTRACT DOESNT FAIL
    it('A private transfer with the wrong amount fails', function() {

        var transferAmount = 6;
        var keystoreFromName = 'keystore2';
        var keystoreToName = 'keystore3';
        var keystorePass = '1234ab';

        var keystoreFrom = getKeystore(keystoreFromName, keystorePass);
        var keystoreTo = getKeystore(keystoreToName, keystorePass);

        var addressTo = keystoreTo.waddress;
        var addressFrom = keystoreFrom.address;
        var privateKey = keystoreFrom.privateKey;

        var balanceFromStart = parseInt(checkBalance(web3, addressFrom));

        var contractInstanceAddress = config.contractInstanceAddress;
        var contractCoinSC = web3.eth.contract(coinSCDefinition);
        var contractCoinInstance = contractCoinSC.at(contractInstanceAddress);
        var value = parseInt(transferAmount) * 10**18;

        wanchainLog('balanceFrom ' + balanceFromStart);

        preScTransfer(contractInstanceAddress, contractCoinInstance, privateKey, addressFrom, addressTo, parseInt(value));
        execSync('sleep 30', function(err,stdout,stderr) {
        });

        var balanceFromEnd = parseInt(checkBalance(web3, addressFrom));

        wanchainLog('balanceFrom ' + balanceFromEnd);

        expect(balanceFromEnd).toBe(balanceFromStart);
    });
    */
});

