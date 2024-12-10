pipeline {
    // 定义任何可用的Jenkins代理
    agent any
    
    // 定义流水线的各个阶段
    stages {
        // 拉取代码阶段
        stage('Pull Code') {
            steps {
              // 从GitHub仓库克隆代码
                git 'https://github.com/clearLoveLA/CIproject.git'
            }
        }
        
        // 构建阶段
        stage('Build') {
            steps {
                // 安装项目依赖
                sh 'npm install'
                // 执行构建命令
                sh 'npm run build'
            }
        }
        
        // 测试阶段
        stage('Test') {
            steps {
                // 运行测试脚本
                sh 'npm run test'
            }
        }

        
    }

    // 添加在pipeline最后
post {
    success {
        echo 'Build succeeded!'
    }
    failure {
        echo 'Build failed!'
    }
}
}