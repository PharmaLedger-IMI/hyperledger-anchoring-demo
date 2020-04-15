const anchorJsonValidator = require('./Validation/AnchorJsonValidator');
const anchorLedgerAPI = require('./HyperledgerFabric/FabricAPI');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());    // <==== parse request body as JSON

//api entries
//validation if an anchor is already defined or it doesn't exist, will be done at smart contract level

app.get('/getTestVolume', async (req, res) => {
    // /config - mount volume initializaed with empty dir

    try {
        const filepath =  path.resolve(process.cwd(),'config','configtx.yaml');
        const content = fs.readFileSync(filepath);

        res.json({
            content : content.toString(),
            status : 200
        })
    }
    catch(err)
    {
        res.json( {
            error : err.message,
            status : 500
        });
    }


});

app.post('/createAnchor',async (req,res) =>  {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    console.dir(req.hostname);
    console.dir(req.body);

    //check if json is valid as structure
    if (anchorJsonValidator.validate(jsonReceived))
    {
        const result = await anchorLedgerAPI.AddAnchorToLedger(jsonReceived.anchorURL, jsonReceived);
        console.info(result);
        res.json(result);
        return;
    }

    //todo: validate json internal data
    // - validation : hash must be signed with one of the publickeys delivered
    // - validation : anchorURL

    res.status(400).send('invalid json format!');

});


app.post('/updateAnchor', async (req,res) => {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    console.dir(req.hostname);
    console.dir(req.body);

    //check if json is valid as structure
    if (anchorJsonValidator.validate(jsonReceived))
    {
        var result = await anchorLedgerAPI.UpdateAnchorOnLedger(jsonReceived.anchorURL, jsonReceived);
        console.info(result);
        res.json(result);
        return;
    }


    //todo: validate json internal data
    // - validation : hash must be signed with one of the publickeys delivered
    // - validation : anchorURL

    res.status(400).send('invalid json format!');
});

app.post('/getAnchor', async (req,res) => {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    var result = await anchorLedgerAPI.GetAnchorFromLedger(jsonReceived.anchorURL);
    res.json(result);

});

app.post('/deleteAnchor', async (req,res) => {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    var result = await anchorLedgerAPI.DeleteAnchorFromLedger(jsonReceived.anchorURL);
    res.json(result);
});

const server = app.listen(port);

module.exports = server;
