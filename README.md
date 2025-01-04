# 基于Docker的持续集成系统 🚀

一个使用Jenkins和Docker实现的现代化持续集成系统。

## 功能特性 ✨

- 自动化构建和部署
- 基于Docker的容器化部署
- GitHub Webhook集成
- 自动化测试集成
- 实时构建状态反馈

## 技术栈 🛠️

- Jenkins
- Docker
- Node.js
- GitHub Actions
- Mocha

## 快速开始 🎯

1. 克隆项目
2. 安装Docker和Jenkins
3. 配置Jenkins和GitHub Webhook

## Jenkins配置 ⚙️

1. 安装必要插件
2. 配置GitHub Webhook
3. 设置构建触发器
4. 配置Pipeline脚本

## 贡献 🤝

欢迎提交Issue和Pull Request

## 许可证 📝

MIT License

4. 运行构建和部署
docker build -t ci-project .
docker run -d -p 3000:3000 --name ci-project ci-project

## 贡献指南 🤝

欢迎提交PR，请遵循以下规范：

- 提交前请先运行`npm run lint`检查代码风格
- 提交时请先创建一个新分支，并提交到`develop`分支
- 提交后请运行`npm run test`检查测试覆盖率
