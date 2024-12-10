pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'ci-project'
        CONTAINER_NAME = 'ci-project'
        APP_PORT = '3000'
    }
    
    stages {
        stage('Check Environment') {
            steps {
                sh '''
                    export PATH="/usr/local/bin:$PATH"
                    node --version
                    npm --version
                '''
            }
        }
        
        stage('Pull Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/ClearloveLA/-Docker-.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '''
                    export PATH="/usr/local/bin:$PATH"
                    npm install
                '''
            }
        }
        
        stage('Build') {
            steps {
                sh '''
                    export PATH="/usr/local/bin:$PATH"
                    npm run build
                '''
            }
        }
        
        stage('Test') {
            steps {
                sh '''
                    export PATH="/usr/local/bin:$PATH"
                    npm test
                '''
            }
        }
        
        stage('Docker Build & Deploy') {
            steps {
                script {
                    sh "docker stop ${CONTAINER_NAME} || true"
                    sh "docker rm ${CONTAINER_NAME} || true"
                    sh "docker build -t ${DOCKER_IMAGE} ."
                    sh "docker run -d -p ${APP_PORT}:${APP_PORT} --name ${CONTAINER_NAME} ${DOCKER_IMAGE}"
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build and deployment succeeded!'
            sh "curl http://localhost:${APP_PORT}/api/build-status"
        }
        failure {
            echo 'Build or deployment failed!'
            sh "curl -X POST http://localhost:${APP_PORT}/api/build-fail"
        }
    }
}