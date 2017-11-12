function sendTransaction(web3, Tx, receiver_address,sender_address, privKeyA, value) {

	let serial = '0x' + web3.eth.getTransactionCount(sender_address).toString(16);
	let rawTx = {
		Txtype: '0x00',
		nonce: serial,
        gasPrice: '0x6fc23ac00',
        gasLimit: '0xf4240',
    	to: receiver_address,//contract address
		value: value,
	};
	// console.log("rawTx:", rawTx);
	let tx = new Tx(rawTx);

	tx.sign(privKeyA);
	let serializedTx = tx.serialize();
	web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
}

module.exports = sendTransaction;