'use strict';

const { Wallets, Gateway } = require('fabric-network');
const channelid = 'mychannel';
const path = require('path');
const fs = require('fs');
const enroll = require('./EnrollFabricUsers');


const FabricAPI = {
    GetAnchorFromLedger : async function(anchorKey){
        try{
            var {contract, gateway} = await CreateGateway();
            //get anchor key
            var anchorValue = await contract.evaluateTransaction( 'GetAnchor',  anchorKey);
            console.info(`Anchor value for ${anchorKey} entry : ${anchorValue}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return {
                anchorKey : anchorKey,
                anchorValue : anchorValue.toString(),
                status : 200
            };
        } catch(error)
        {
            console.info(error);
            return {
                anchorKey : anchorKey,
                anchorValue : error.message,
                status : 500
            };
        }

    },
    AddAnchorToLedger : async function(anchorKey, anchorValue){
        try{
            var {contract, gateway} = await CreateGateway();
            //get anchor key
            await contract.submitTransaction( 'AddAnchor',  anchorKey, anchorValue);
            console.info(`Submitted AddAnchor value for ${anchorKey} entry : ${anchorValue}`);

            // Disconnect from the gateway.
            await gateway.disconnect();

            return {
                anchorKey : anchorKey,
                anchorValue : anchorValue,
                status : 200
            };
        } catch(error)
        {
            console.info(error);
            return {
                anchorKey : anchorKey,
                anchorValue : error.message,
                status : 500
            };
        }

    },
    UpdateAnchorOnLedger : async function(anchorKey, anchorValue) {
        try{
            var {contract, gateway} = await CreateGateway();

            //update anchor to ledger
            await contract.submitTransaction('UpdateAnchor', anchorKey, anchorValue);
            console.log('UpdateAnchor Transaction has been submitted');

            // Disconnect from the gateway.
            await gateway.disconnect();

            return {
                anchorKey : anchorKey,
                anchorValue : 'AnchorKey was update to the ledger',
                status : 200
            };
        } catch(error)
        {
            console.info(error);
            return {
                anchorKey : anchorKey,
                anchorValue : error.message,
                status : 500
            };
        }
    },
    DeleteAnchorFromLedger : async function(anchorKey) {
        try{
            var {contract, gateway} = await CreateGateway();

            //update anchor to ledger
            await contract.submitTransaction('DeleteAnchor', anchorKey);
            console.log('DeleteAnchor Transaction has been submitted');

            // Disconnect from the gateway.
            await gateway.disconnect();

            return {
                anchorKey : anchorKey,
                anchorValue : 'AnchorKey was deleted from ledger'
            };
        } catch(error)
        {
            console.info(error);
            return {
                anchorKey : anchorKey,
                anchorValue : error.message
            };
        }
    },
    Test : async function() {
       await main();
    }

};

async function CreateGateway(){
    //enroll
    await enroll.enroll();

    // Parse the connection profile. This would be the path to the file downloaded
    // from the IBM Blockchain Platform operational console.
    const ccpPath = path.resolve(__dirname, 'connection.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Configure a wallet. This wallet must already be primed with an identity that
    // the application can use to interact with the peer node.
    //todo : refactor to have a common place to get the wallet
    const walletPath = path.resolve(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Create a new gateway, and connect to the gateway peer node(s). The identity
    // specified must already exist in the specified wallet.
    const gateway = new Gateway();
   // await gateway.connect(ccp, { wallet, identity: 'user2',discovery: { enabled: true, asLocalhost: true } });
    await gateway.connect(ccp, { wallet, identity: 'user2',discovery: { enabled: true, asLocalhost: false } });

    // Get the network channel that the smart contract is deployed to.
    const network = await gateway.getNetwork(channelid);

    // Get the contract from the network.
    const contract = network.getContract('anchorCCpackage');

    if (contract === undefined)
        throw new Error('Unable to get contract');
    return {contract, gateway};
}

async function main(){
    //enroll
    await enroll.enroll();

    // Parse the connection profile. This would be the path to the file downloaded
    // from the IBM Blockchain Platform operational console.
    const ccpPath = path.resolve(__dirname, 'connection.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Configure a wallet. This wallet must already be primed with an identity that
    // the application can use to interact with the peer node.
    //todo : refactor to have a common place to get the wallet
    const walletPath = path.resolve(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Create a new gateway, and connect to the gateway peer node(s). The identity
    // specified must already exist in the specified wallet.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'user2', discovery: { enabled: true, asLocalhost: true } });

    // Get the network channel that the smart contract is deployed to.
    const network = await gateway.getNetwork(channelid);

    // Get the contract from the network.
    const contract = network.getContract('anchorCCpackage');

    var anchorValue = await contract.evaluateTransaction( 'GetAnchor',  'anchorKey');
    //console.info(`anchor loaded from ledge ${anchorValue.toString('utf8')}`);
    console.info(`Anchor value for default entry : ${anchorValue}`);
   // var d = Buffer.from(anchorValue).toString('utf8');
   // console.info(d);
    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
    await contract.submitTransaction('AddAnchor', 'anchorUrl4', 'AnchorValue4');
    console.log('Transaction has been submitted');

    var anchorValue = await contract.evaluateTransaction( 'GetAnchor',  'anchorUrl3');
    console.info(`Anchor value for normal entry key : ${anchorValue}`);
    //console.info(JSON.parse(anchorValue.toString('utf8')));

    // Disconnect from the gateway.
    await gateway.disconnect();


}


module.exports=FabricAPI;