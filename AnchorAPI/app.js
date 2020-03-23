const anchorJsonValidator = require('./Validation/AnchorJsonValidator');

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());    // <==== parse request body as JSON

//api entries
//validation if an anchor is already defined or it doesn't exist, will be done at smart contract level

app.post('/createAnchor',(req,res) => {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    console.dir(req.hostname);
    console.dir(req.body);



    //check if json is valid as structure
    if (anchorJsonValidator.validate(jsonReceived))
    {
        res.status(200).send('CreateAnchor was called!');
        return;
    }


    //todo: validate json internal data
    // - validation : hash must be signed with one of the publickeys delivered
    // - validation : anchorURL

    //todo: simulate create anchor in fake HyperledgerAPIWrapper
    //todo: return based on status

    res.status(400).send('invalid json format!');

});


app.post('/updateAnchor', (req,res) => {
    var hostname = req.hostname;
    //get json
    var jsonReceived = req.body;

    console.dir(req.hostname);
    console.dir(req.body);

    //check if json is valid as structure
    if (anchorJsonValidator.validate(jsonReceived))
    {
        res.status(200).send('updateAnchor was called!');
        return;
    }


    //todo: validate json internal data
    // - validation : hash must be signed with one of the publickeys delivered
    // - validation : anchorURL

    //todo: simulate update anchor in fake HyperledgerAPIWrapper
    //todo: return based on status

    res.status(400).send('invalid json format!');
});

app.post('/getAnchor', (req,res) => {
    var hostname = req.hostname;

    //todo: get anchor from url

    //todo: simulate get anchor in fake HyperledgerAPIWrapper
    //todo: return based on status

    res.status(200).send('getAnchor was called!');
});

const server = app.listen(port);

module.exports = server;
