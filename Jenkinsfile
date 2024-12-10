pipeline {
    agent any
    
    stages {
        stage('Pull Code') {
            steps {
                // 使用简单的git命令
                git branch: 'master',
                    url: 'https://github.com/ClearloveLA/-Docker-.git'
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