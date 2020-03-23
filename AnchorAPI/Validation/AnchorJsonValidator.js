//check if json is valid as structure
//todo : maybe json values should be checked by type ?
const jsonKeys = [
    ["anchorURL",""],
    ["writeList",[]],
    ["currentHash",[]],
    ["hashes",[]],
    ["timestamps",[]],
    ["signatures",[]]
];

const anchorJsonValidator = {

  validate : function(jsonData)
  {
      if (jsonData === null || jsonData === undefined)
      {
          return false;
      }
      var len=jsonKeys.length;
      for (var i=0; i < len; i++)
      {
            if (!(jsonKeys[i][0] in jsonData)) {
                return  false;
            }

      }

      return true;
  }
};

module.exports = anchorJsonValidator;