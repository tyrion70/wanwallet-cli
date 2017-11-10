const fs = require('fs');
const wanUtil = require('wanchain-util');
const Web3 = require("web3");
const sendTransaction = require('./helpers/sendTransaction');
const checkBalance = require('./helpers/checkBalance');
const getKeystore = require('./helpers/getKeystore');
const Tx = require('wanchain-util').ethereumTx;
const keythereum = require("keythereum");
const execSync = require('child_process').execSync;
const config = require('../config');
const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));
//const wanchainLog = require('../utils/wanchainLog');

web3.wan = new wanUtil.web3Wan(web3);


describe('Transfer to account', function() {

  it('A transfer to an account adds wancoin to the other account', function() {
    var transferAmount = 1;
    var keystoreFromName = 'keystore2';
    var keystoreToName = 'keystore3';
    var keystorePass = '1234ab';

    var keystoreFrom = getKeystore(keystoreFromName,keystorePass);
    var keystoreTo = getKeystore(keystoreToName,keystorePass);

    var addressTo=keystoreTo.address;
    var addressFrom = keystoreFrom.address;
    var privateKey = keystoreFrom.privateKey;

    var balanceFromStart = parseInt(checkBalance(web3, addressFrom));
    var balanceToStart = parseInt(checkBalance(web3, addressTo));

    //wanchainLog('balanceFrom ' + balanceFromStart);
    //wanchainLog('balanceTo ' + balanceToStart);

    const strSendValueInWei = web3.toWei(transferAmount);
    const bnSendValueInWei = new web3.BigNumber(strSendValueInWei);
    const value = '0x' + bnSendValueInWei.toString(16);

    sendTransaction(web3, Tx, addressTo, addressFrom, privateKey, value);
    execSync('sleep 30', function(err,stdout,stderr) {
    });

    var balanceFromEnd = parseInt(checkBalance(web3, addressFrom));
    var balanceToEnd = parseInt(checkBalance(web3, addressTo));

    //wanchainLog('balanceFrom ' + balanceFromEnd);
    //wanchainLog('balanceTo ' + balanceToEnd);

    expect(balanceFromEnd).toBe(balanceFromStart - transferAmount);
    expect(balanceToEnd).toBe(balanceToStart + transferAmount);
  });
});
