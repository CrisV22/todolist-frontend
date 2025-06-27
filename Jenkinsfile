pipeline {
    agent any

    environment {
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_FE_DEPLOY_HOOK = credentials('render-todolist-frontend')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Construindo os containers...'
                // bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                // dir('frontend\\cypress') {
                //     bat 'npm install'
                //     bat 'npx cypress run'
                // }
            }
        }
        stage('Debug Branch') {
            steps {
                echo "Current branch: ${env.BRANCH_NAME}"
            }
        }
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
