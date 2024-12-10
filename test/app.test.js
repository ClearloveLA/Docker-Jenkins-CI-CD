const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  // 测试构建成功状态的API
  test('should return success for valid build', async () => {
      // 发送GET请求到构建状态接口
      const response = await request(app).get('/api/build-status');
      // 验证响应状态码为200
      expect(response.status).toBe(200);
      // 验证返回的状态为success
      expect(response.body.status).toBe('success');
  });

  // 测试构建失败情况的处理
  test('should handle build failure correctly', async () => {
      // 发送POST请求到构建失败接口
      const response = await request(app).post('/api/build-fail');
      // 验证响应状态码为500
      expect(response.status).toBe(500);
      // 验证错误信息存在
      expect(response.body.error).toBeDefined();
  });
});