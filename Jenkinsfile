pipeline {
    agent any
    
    triggers {
        githubPush()
    }
    
    stages {
        stage('Test Setup') {
            steps {
                sh '''
                    echo "Node version:"
                    node --version
                    echo "NPM version:"
                    npm --version
                '''
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
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