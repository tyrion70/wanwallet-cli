const fs = require('fs');
const keythereum = require("keythereum");

function getKeystore(keystoreName, keystorePass) {

    var filenameFrom = "./src/keystore/" + keystoreName + ".json";
    var keystoreStrFrom = fs.readFileSync(filenameFrom, "utf8");
    var keystoreFrom = JSON.parse(keystoreStrFrom)[1];
    var address = keystoreFrom.address;

    var keyAObj = {version:keystoreFrom.version, crypto:keystoreFrom.crypto};
    var privateKey = keythereum.recover(keystorePass, keyAObj);
	return { address, privateKey }
}

module.exports = getKeystore;