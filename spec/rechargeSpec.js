const execSync = require('child_process').execSync;
const wanUtil = require('wanchain-util');
const Web3 = require("web3");

const config = require('../config');

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));
const checkBalance = require('./helpers/checkBalance');
const recharge = require('./helpers/recharge');
const getKeystore = require('./helpers/getKeystore');

web3.wan = new wanUtil.web3Wan(web3);

describe('Refill account', function() {

    it('The balance of a short address is 12 more after refill', function() {
        var keystoreName = 'keystore2';
        var keystorePass = '1234ab';

        var keystore = getKeystore(keystoreName,keystorePass);
        var oldBalance = parseInt(checkBalance(web3, keystore.address));

        recharge(keystore.address);
        execSync('sleep 30', function(err,stdout,stderr) {
        });

        var newBalance = parseInt(checkBalance(web3, keystore.address));
        expect(newBalance).toBe(oldBalance+12);
    });
});
