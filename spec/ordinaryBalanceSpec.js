const wanUtil = require('wanchain-util');
const Web3 = require("web3");

const config = require('../config');
const checkBalance = require('./helpers/checkBalance');
const getKeystore = require('./helpers/getKeystore');

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));


web3.wan = new wanUtil.web3Wan(web3);


describe('Getting balances', function() {

  it('The balance of an address is 84', function() {
    let keystoreName = 'keystore';
    let keystorePass = '1234ab';
    let balance='84';

    let keystore = getKeystore(keystoreName,keystorePass);
    let weiToEth = checkBalance(web3, keystore.address);

    expect(weiToEth).toBe(balance);
  });
});
