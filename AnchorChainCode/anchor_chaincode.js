'use strict';
const shim = require('fabric-shim');
const util = require('util');

let anchorChainCode = class
{
    Init(stub)
    {
        return stub.putState('anchorKey', Buffer.from('anchor chain code initiated. V 1.0'))
            .then(
                () => {
                    console.info('Anchor chain code instantiated');
                    return shim.success();
                },
                () => {
                    return shim.error(Buffer.from("Unable to insert default entry in ledger state"));
                }
            )
    }

    async Invoke(stub){
        //log information about transaction and the function called on chaincode
        console.info('Transaction ID: ' + stub.getTxID());
        console.info('Args: %j',stub.getArgs());

        let ret = stub.getFunctionAndParameters();
        console.info('Calling function : ' + ret.fcn);

        //check if the invoked method is implemented
        let method = this[ret.fcn];
        if (!method)
        {
            console.info('Invoked method ' + ret.fcn + ' is not supported ');
            throw new Error('Unknown function '+ret.fcn+' was invoked');
        }

        //invoke the called method
        try{
            let paylod = await method(stub, ret.params,this);
            return shim.success(paylod);
        } catch (err)
        {
            console.info(err);
            return shim.error(err);
        }
    }

    PayloadExist(payloadAsBytes)
    {
        return !(!payloadAsBytes || payloadAsBytes.length === 0);
    }

    async AddAnchor(stub, args, thisClass)
    {
        if (args.length !== 2)
        {
            Console.info('AddAnchor require 2 parameters : AnchorUrl and AnchorValue');
            throw new Error('Expecting number of arguments : 2')
        }
        let anchorUrl = args[0];
        let anchorValue = args[1];

        //todo sanitation of arguments

        let payloadAsBytes = await stub.getState(anchorUrl);
        if (thisClass.PayloadExist(payloadAsBytes))
        {
            throw new Error(`Anchor already exist [${payloadAsBytes.toString()}] end of anchor.`);
        }

        let anchor = {};
        anchor.anchorUrl = anchorUrl;
        anchor.anchorValue = anchorValue;

        await stub.putState(anchorUrl,Buffer.from(JSON.stringify(anchor)));

    }

    async queryAllAnchors(stub, args, thisClass)
    {
        const allAnchors = [];
        let payloadAsBytes = await stub.getState("anchorKey");
        allAnchors.push("anchorKey",Buffer.from(payloadAsBytes).toString('utf8'));

        console.info(allAnchors);
        return allAnchors;

    }

    async GetAnchor(stub, args, thisClass)
    {
        if (args.length !== 1)
        {
            console.info("GetAnchor require 1 argument: anchorUrl");
            throw new Error('GetAnchor require 1 argument');
        }

        let anchorUrl = args[0];

        //todo: sanitation

        let payloadAsBytes = await stub.getState(anchorUrl);
        if (!thisClass.PayloadExist(payloadAsBytes))
        {
            let jsonResp = {};
            jsonResp.Error = 'AnchorUrl does not exist: ' + anchorUrl;
            throw new Error(JSON.stringify(jsonResp));
        }
        console.info('Anchor obtained from state '+ payloadAsBytes.toString());
        return payloadAsBytes;
    }

    async DeleteAnchor(stub, args, thisClass)
    {
        if (args.length !== 1)
        {
            console.info('DeleteAnchor require only 1 argument : anchorUrl');
            throw new Error('DeleteAnchor require 1 argument');
        }
        let anchorUrl = args[0];
        let payloadAsBytes = stub.getState(anchorUrl);
        if (!thisClass.PayloadExist(payloadAsBytes))
        {
            let jsonResp = {};
            jsonResp.Error = 'AnchorUrl does not exist: ' + anchorUrl;
            throw new Error(JSON.stringify(jsonResp));
        }

        await stub.delete(anchorUrl);
    }

};

shim.start(new anchorChainCode());