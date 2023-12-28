const request = require('supertest');
require('jest');
const { Category } = require('../../models/category');
let server;


describe('/api/categories', () => {
    beforeEach(() => {
        server = require('../../index');
    })
    afterEach(async () => {
        server.close();
        await Category.deleteMany({});
    });


    describe('GET /', () => {
        it('should return all categories', async () => {
            await Category.collection.insertMany([
                { name: 'category1' },
                { name: 'category2' }
            ]);
            const res = await request(server).get('/api/categories');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(c => c.name === 'category1')).toBeTruthy();
            expect(res.body.some(c => c.name === 'category2')).toBeTruthy();
        });
    });




});