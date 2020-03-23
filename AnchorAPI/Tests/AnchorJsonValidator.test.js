const anchorJsonValidator = require('../Validation/AnchorJsonValidator');
const anchorJsonProvider = require('./AnchorJsonProvider');

describe('Anchor json validation', () => {
    it('Anchor json is valid with the correct keys', () => {
        var jsondata = anchorJsonProvider.getValidAnchorJson();
        expect(anchorJsonValidator.validate(jsondata)).toBe(true);
    });

    it('json is invalid with the wrong keys', () => {
        var jsondata = anchorJsonProvider.getInvalidAnchorJson();
        expect(anchorJsonValidator.validate(jsondata)).toBe(false);
    });

});

