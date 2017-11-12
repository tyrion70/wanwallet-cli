const wanUtil = require('wanchain-util');
const Web3 = require("web3");
const sendTransaction = require('./helpers/sendTransaction');
const checkBalance = require('./helpers/checkBalance');
const getKeystore = require('./helpers/getKeystore');
const Tx = require('wanchain-util').ethereumTx;
const execSync = require('child_process').execSync;
const config = require('../config');
const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));
//const wanchainLog = require('../utils/wanchainLog');

web3.wan = new wanUtil.web3Wan(web3);


describe('Transfer to account', function() {

  it('A transfer to an account adds wancoin to the other account', function() {
    let transferAmount = 1;
    let keystoreFromName = 'keystore2';
    let keystoreToName = 'keystore3';
    let keystorePass = '1234ab';

    let keystoreFrom = getKeystore(keystoreFromName,keystorePass);
    let keystoreTo = getKeystore(keystoreToName,keystorePass);

    let addressTo=keystoreTo.address;
    let addressFrom = keystoreFrom.address;
    let privateKey = keystoreFrom.privateKey;

    let balanceFromStart = parseInt(checkBalance(web3, addressFrom));
    let balanceToStart = parseInt(checkBalance(web3, addressTo));

    //wanchainLog('balanceFrom ' + balanceFromStart);
    //wanchainLog('balanceTo ' + balanceToStart);

    let strSendValueInWei = web3.toWei(transferAmount);
    let bnSendValueInWei = new web3.BigNumber(strSendValueInWei);
    let value = '0x' + bnSendValueInWei.toString(16);

    sendTransaction(web3, Tx, addressTo, addressFrom, privateKey, value);
    execSync('sleep 30', function(err,stdout,stderr) {
    });

    let balanceFromEnd = parseInt(checkBalance(web3, addressFrom));
    let balanceToEnd = parseInt(checkBalance(web3, addressTo));

    //wanchainLog('balanceFrom ' + balanceFromEnd);
    //wanchainLog('balanceTo ' + balanceToEnd);

    expect(balanceFromEnd).toBe(balanceFromStart - transferAmount);
    expect(balanceToEnd).toBe(balanceToStart + transferAmount);
  });
});
