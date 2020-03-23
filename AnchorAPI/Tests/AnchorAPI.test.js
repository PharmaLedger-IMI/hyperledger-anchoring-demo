const request = require('supertest');
const app = require('../app');
const anchorJsonProvider = require('./AnchorJsonProvider');



describe('createAnchor test', () =>{
    it('createAnchor will succeed with correct json', async () => {
        var jsondata = anchorJsonProvider.getValidAnchorJson();

        const res = await request(app)
            .post('/createAnchor')
            .send(jsondata);
        expect(res.statusCode).toBe(200);
        app.close();

    });

    it('createAnchor will fail with wrong json', async () => {
        var jsondata = anchorJsonProvider.getInvalidAnchorJson();

        const res = await request(app)
            .post('/createAnchor')
            .send(jsondata);
        expect(res.statusCode).toBe(400);
        app.close();

    });

});

describe('updateAnchor test', () =>{

   it('updateAnchor will succeed with correct json', async () =>
    {
        var jsondata = anchorJsonProvider.getValidAnchorJson();
        const res = await request(app)
            .post('/updateAnchor')
            .send(jsondata);
        expect(res.statusCode).toBe(200);
        app.close();
    });

    it('updateAnchor will fail with wrong json', async () =>
    {
        var jsondata = anchorJsonProvider.getInvalidAnchorJson();
        const res = await request(app)
            .post('/updateAnchor')
            .send(jsondata);
        expect(res.statusCode).toBe(400);
        app.close();
    });

} );


afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 1500)); // avoid jest open handle error
});