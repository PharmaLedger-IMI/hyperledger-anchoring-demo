//provide json data for testing. in correct or malformed formats

var anchorJsonProvider = {
  getValidAnchorJson : function() {
      return {
          "anchorURL": "url",
          "writeList": ["publicKey1", "publicKey2"],
          "currentHash": "hash",
          "hashes": ["hash1", "hash2"],
          "timestamps": ["time1", "time2"],
          "signatures": ["signature 1", "signature 2"]
      };
},

getInvalidAnchorJson : function() {
    return {
        "anchorURL1": "url",
        "writeList1": ["publicKey1", "publicKey2"],
        "currentHash1": "hash",
        "hashes1": ["hash1", "hash2"],
        "timestamps1": ["time1", "time2"],
        "signatures1": ["signature 1", "signature 2"]
    };
}
};


module.exports = anchorJsonProvider;