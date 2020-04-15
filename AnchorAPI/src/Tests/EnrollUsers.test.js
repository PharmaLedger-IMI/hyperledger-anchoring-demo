const enroll = require('../HyperledgerFabric/EnrollFabricUsers');
const main = require('../HyperledgerFabric/FabricAPI');
describe("Check users enroll", () => {
    it("users ca be erolled", async () =>{
        expect(await enroll.enrollAdmin()).toBe(true);
        expect(await enroll.enrollUser()).toBe(true);

        //await main.Test();

       // await main.AddAnchorToLedger('anchor1', 'anchorvalue1');
        await main.GetAnchorFromLedger('anchor1');
        //await main.UpdateAnchorOnLedger('anchor1','anchorValue2');
        //await main.GetAnchorFromLedger('anchor1');
        //await main.DeleteAnchorFromLedger('anchor1');
    })
});