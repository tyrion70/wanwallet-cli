const wanUtil = require('wanchain-util');
const Tx = require('wanchain-util').ethereumTx;
const Web3 = require("web3");
const ethUtil = require('wanchain-util').ethereumUtil;
const config = require('../../config');

const web3 = new Web3(new Web3.providers.HttpProvider( config.host + ":8545"));

// const wanchainLog = require('../utils/wanchainLog');

web3.wan = new wanUtil.web3Wan(web3);

function preScTransfer(contractInstanceAddress, contractCoinInstance, privateKey, myAddr, to_waddress, value){

	let otaDestAddress = ethUtil.generateOTAWaddress(to_waddress).toLowerCase();
	// console.log('otaDestAddress: ', otaDestAddress);
	let payload = contractCoinInstance.buyCoinNote.getData(otaDestAddress, value);
	let serial = '0x' + web3.eth.getTransactionCount(myAddr).toString(16);
	let rawTx = {
		Txtype: '0x0',
		nonce: serial,
		gasPrice: '0x6fc23ac00',
		gasLimit: '0xf4240',
		to: contractInstanceAddress,//contract address
		value: value,
		data: payload
	};
	// console.log("payload: " + rawTx.data);

	let tx = new Tx(rawTx);
	tx.sign(privateKey);
	let serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
}


module.exports = preScTransfer;
