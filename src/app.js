// src/app.js

const express = require('express');
const monitor = require('./monitor');
const config = require('./config/config');

// 创建Express应用1
const app = express();

// 添加路由12
app.get('/api/build-status', (req, res) => {
    res.status(200).json({ status: 'success' });
});

app.post('/api/build-fail', (req, res) => {
    res.status(500).json({ error: 'Build failed' });
});

/**
 * 检查构建状态并记录指标的异步函数
 * 用于监控Jenkins构建过程并记录相关数据
 */
async function checkBuild() {
    try {
        // 检查指定构建ID的构建状态/
        // build-123为构建ID，可以是Jenkins中的实际构建号
        await monitor.checkBuildStatus('build-123');

        // 记录构建指标
        // duration: 构建持续时间（秒）
        // coverage: 测试覆盖率（百分比）
        monitor.logBuildMetrics({
            duration: 120,    // 构建耗时120秒
            coverage: 85      // 测试覆盖率85%
        });
    } catch (error) {
        // 如果构建检查过程出现错误，记录错误信息
        console.error('Build check failed:', error);
    }
}

// 只在非测试环境启动服务器
if (process.env.NODE_ENV !== 'test') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

// 导出app和checkBuild
module.exports = {
    app,
    checkBuild
};