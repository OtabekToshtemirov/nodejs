const request = require('supertest');
require('jest');

let server;


describe('/api/categories', () => {
    beforeEach(() => {
        server = require('../../index');
    })
    afterEach( () => {
         server.close();
    })

    describe('GET /', () => {
        it('should return all categories', async () => {
           const response = await request(server).get('/api/categories');
              expect(response.status).toBe(200);

        })
    })
});