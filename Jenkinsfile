pipeline {
    agent any
    
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
                    /usr/bin/node --version
                    echo "NPM version:"
                    /usr/bin/npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh '/usr/bin/npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh '/usr/bin/npm test'
            }
        }
    }
    
    post {
        success {
            echo 'Tests passed successfully!'
        }
        failure {
            echo 'Tests failed!'
        }
    }
}