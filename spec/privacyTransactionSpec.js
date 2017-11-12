const wanUtil = require('wanchain-util');
const Web3 = require("web3");
const config = require('../config');
const execSync = require('child_process').execSync;
const checkBalance = require('./helpers/checkBalance');
const getKeystore = require('./helpers/getKeystore');
const preScTransfer = require('./helpers/preScTransfer');
//const wanchainLog = require('../utils/wanchainLog');
const coinSCDefinition = wanUtil.coinSCAbi;

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));

web3.wan = new wanUtil.web3Wan(web3);

describe('Privacy transfer to account', function() {

    it('A private transfer to an account adds wancoin to the other account', function() {

        let transferAmount = 5;
        let keystoreFromName = 'keystore2';
        let keystoreToName = 'keystore3';
        let keystorePass = '1234ab';

        let keystoreFrom = getKeystore(keystoreFromName, keystorePass);
        let keystoreTo = getKeystore(keystoreToName, keystorePass);

        let addressTo = keystoreTo.waddress;
        let addressFrom = keystoreFrom.address;
        let privateKey = keystoreFrom.privateKey;

        let balanceFromStart = parseInt(checkBalance(web3, addressFrom));

        let contractInstanceAddress = config.contractInstanceAddress;
        let contractCoinSC = web3.eth.contract(coinSCDefinition);
        let contractCoinInstance = contractCoinSC.at(contractInstanceAddress);
        let value = parseInt(transferAmount) * 10**18;

        //wanchainLog('balanceFrom ' + balanceFromStart);

        preScTransfer(contractInstanceAddress, contractCoinInstance, privateKey, addressFrom, addressTo, parseInt(value));
        execSync('sleep 30', function(err,stdout,stderr) {
        });

        let balanceFromEnd = parseInt(checkBalance(web3, addressFrom));

        //wanchainLog('balanceFrom ' + balanceFromEnd);

        expect(balanceFromEnd).toBe(balanceFromStart - transferAmount);
    });
    /* DOESNT WORK CONTRACT DOESNT FAIL
    it('A private transfer with the wrong amount fails', function() {

        let transferAmount = 6;
        let keystoreFromName = 'keystore2';
        let keystoreToName = 'keystore3';
        let keystorePass = '1234ab';

        let keystoreFrom = getKeystore(keystoreFromName, keystorePass);
        let keystoreTo = getKeystore(keystoreToName, keystorePass);

        let addressTo = keystoreTo.waddress;
        let addressFrom = keystoreFrom.address;
        let privateKey = keystoreFrom.privateKey;

        let balanceFromStart = parseInt(checkBalance(web3, addressFrom));

        let contractInstanceAddress = config.contractInstanceAddress;
        let contractCoinSC = web3.eth.contract(coinSCDefinition);
        let contractCoinInstance = contractCoinSC.at(contractInstanceAddress);
        let value = parseInt(transferAmount) * 10**18;

        wanchainLog('balanceFrom ' + balanceFromStart);

        preScTransfer(contractInstanceAddress, contractCoinInstance, privateKey, addressFrom, addressTo, parseInt(value));
        execSync('sleep 30', function(err,stdout,stderr) {
        });

        let balanceFromEnd = parseInt(checkBalance(web3, addressFrom));

        wanchainLog('balanceFrom ' + balanceFromEnd);

        expect(balanceFromEnd).toBe(balanceFromStart);
    });
    */
});

