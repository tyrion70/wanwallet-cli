async function sendTransaction(web3, Tx, receiver_address,sender_address, privKeyA, value) {

	var serial = '0x' + web3.eth.getTransactionCount(sender_address).toString(16);
	var rawTx = {
		Txtype: '0x00',
		nonce: serial,
        gasPrice: '0x6fc23ac00',
        gasLimit: '0xf4240',
    	to: receiver_address,//contract address
		value: value,
	};
	// console.log("rawTx:", rawTx);
	var tx = new Tx(rawTx);

	tx.sign(privKeyA);
	var serializedTx = tx.serialize();
	let hash = web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
}

module.exports = sendTransaction;