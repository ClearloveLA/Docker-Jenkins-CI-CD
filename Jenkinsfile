pipeline {
    agent any
    
    environment {
        NODE_HOME = '/usr/local/node-v16.20.2-linux-x64'
        PATH = "${env.NODE_HOME}/bin:${PATH}"
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
                    echo "Node binary location:"
                    ls -l /usr/local/node-v16.20.2-linux-x64/bin/node
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