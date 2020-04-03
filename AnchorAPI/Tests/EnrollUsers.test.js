const enroll = require('../Hyperledger/EnrollFabricUsers');
const main = require('../Hyperledger/FabricAPI');
describe("Check users enroll", () => {
    it("users ca be erolled", async () =>{
        expect(await enroll.enrollAdmin()).toBe(true);
        expect(await enroll.enrollUser()).toBe(true);

        await main;

    })
});