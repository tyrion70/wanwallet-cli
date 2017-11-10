const exec = require('child_process').exec;
const wanUtil = require('wanchain-util');
const Web3 = require("web3");

const config = require('../../config');

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));

web3.wan = new wanUtil.web3Wan(web3);

async function recharge(address) {

	let cmdStr;
	try{
		cmdStr = 'curl -d "userAddr=' + address + '" ' + config.host + ':3000/faucet';
	} catch (e) {
		return;
	}
	exec(cmdStr, function(err,stdout,stderr){

	});
}
module.exports = recharge;