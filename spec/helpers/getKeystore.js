const fs = require('fs');
const keythereum = require("keythereum");

function getKeystore(keystoreName, keystorePass) {

    let filenameFrom = "./src/keystore/" + keystoreName + ".json";
    let keystoreStrFrom = fs.readFileSync(filenameFrom, "utf8");
    let keystoreFrom = JSON.parse(keystoreStrFrom)[1];
    let address = keystoreFrom.address;
    let waddress = keystoreFrom.waddress;

    let keyAObj = {version:keystoreFrom.version, crypto:keystoreFrom.crypto};
    let privateKey = keythereum.recover(keystorePass, keyAObj);
	return { address, privateKey, waddress };
}

module.exports = getKeystore;