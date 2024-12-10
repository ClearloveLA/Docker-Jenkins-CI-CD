// src/monitor.js

const axios = require('axios');
const nodemailer = require('nodemailer');
const config = require('./config');

// 实现获取Jenkins构建状态的函数
const getBuildStatus = async (buildId) => {
    try {
        const response = await axios.get(`${config.jenkins.url}/job/${buildId}/lastBuild/api/json`);
        return response.data.result;
    } catch (error) {
        console.error('Failed to get build status:', error);
        return 'FAILURE';
    }
};

// 实现发送通知的函数
const sendNotification = async (options) => {
    const transporter = nodemailer.createTransport({
        service: 'qq',
        auth: {
            user: config.notification.email,
            pass: 'dhxeksclomekbecb' // 需要设置QQ邮箱的授权码
        }
    });

    await transporter.sendMail({
        from: config.notification.email,
        to: options.to,
        subject: options.subject,
        text: options.content
    });
};

const monitorBuild = {
    // 检查构建状态的方法
    checkBuildStatus: async (buildId) => {
        // 获取构建状态
        const status = await getBuildStatus(buildId);
        // 如果构建失败，发送通知
        if (status === 'FAILURE') {
            await sendNotification({
                type: 'email',
                to: config.notification.email,
                subject: 'Build Failed',
                content: `Build ${buildId} failed. Please check.`
            });
        }
        return status;
    },
    
    // 记录构建指标的方法
    logBuildMetrics: (metrics) => {
        // 记录构建时间
        console.log(`Build Time: ${metrics.duration}s`);
        // 记录测试覆盖率
        console.log(`Test Coverage: ${metrics.coverage}%`);
    }
}; 

module.exports = monitorBuild;