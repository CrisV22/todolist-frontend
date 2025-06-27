pipeline {
    agent any

    environment {
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_FE_DEPLOY_HOOK = credentials('render-todolist-frontend')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking...'
                git branch: 'main', 
                    url: 'https://github.com/CrisV22/todolist-frontend',
                    credentialsId: 'github-pat-global'
                echo 'Checking completed sucessfully!'
            }
        }
        stage('Build') {
            steps {
                echo 'Construindo os containers...'
                // bat 'npm install'
            }
        }
        // stage('Test') {
        //     steps {
        //         echo 'Testing..'
        //         dir('frontend\\cypress') {
        //             bat 'npm install'
        //             bat 'npx cypress run'
        //         }
        //     }
        // } /
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to production...'
            }
        }
    }

    post {
        success {
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed. Check logs.'
        }
    }
}
