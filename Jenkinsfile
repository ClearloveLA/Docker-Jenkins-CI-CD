pipeline {
    agent any
    
    stages {
        stage('Pull Code') {
            steps {
                // 使用checkout命令替代git命令
                checkout([$class: 'GitSCM',
                    branches: [[name: '*/master']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/ClearloveLA/-Docker-.git',
                        credentialsId: '' // 如果是公开仓库，可以不需要凭证
                    ]]
                ])
            }
        }
        
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    
    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}