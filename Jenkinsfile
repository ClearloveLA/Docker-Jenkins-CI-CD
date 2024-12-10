pipeline {
    agent any
    
    environment {
        NODE_HOME = '/usr/local/node-v16.20.2-linux-x64'
        PATH = "${env.NODE_HOME}/bin:${PATH}"
        DOCKER_IMAGE = 'ci-project'
        CONTAINER_NAME = 'ci-project'
        APP_PORT = '3000'
    }
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Pull Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ClearloveLA/-Docker-.git'
            }
        }
        
        stage('Test Setup') {
            steps {
                sh '''
                    echo "Node version:"
                    /usr/local/node-v16.20.2-linux-x64/bin/node --version
                    echo "NPM version:"
                    /usr/local/node-v16.20.2-linux-x64/bin/npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    export PATH="/usr/local/node-v16.20.2-linux-x64/bin:$PATH"
                    npm install
                '''
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '''
                    export PATH="/usr/local/node-v16.20.2-linux-x64/bin:$PATH"
                    npm test
                '''
            }
        }
        
        stage('Docker Build & Deploy') {
            steps {
                script {
                    // 停止并删除旧容器（如果存在）
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    
                    // 构建新镜像
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    
                    // 运行新容器
                    sh "docker run -d -p ${APP_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build and deployment succeeded!'
            sh "curl http://localhost:${APP_PORT}/api/build-status || true"
        }
        failure {
            echo 'Build or deployment failed!'
            sh "curl -X POST http://localhost:${APP_PORT}/api/build-fail || true"
        }
    }
}