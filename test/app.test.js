const request = require('supertest');
const { app } = require('../src/app');

describe('API Tests', () => {
    let server;

    beforeAll(() => {
        // 启动服务器l
        server = app.listen(0);
    });

    afterAll((done) => {
        // 关闭服务器
        server.close(done);
    });

    test('should return success for valid build', async () => {
        const response = await request(server)
            .get('/api/build-status')
        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
    });

    test('should handle build failure correctly', async () => {
        const response = await request(server)
            .post('/api/build-fail');
        expect(response.status).toBe(500);
        expect(response.body.error).toBeDefined();
    });
});