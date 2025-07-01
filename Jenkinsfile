pipeline {
    agent any

    environment {
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_FE_DEPLOY_HOOK = credentials('render-todolist-frontend')
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building containers...'
                bat 'npm install'
                bat 'docker-compose up -d --build'
            }
        }
        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
            }
        }
        // stage('Debug Branch') {
        //     steps {
        //         echo "Current branch: ${env.GIT_BRANCH}"
        //         echo "Current branch: ${env.BRANCH_NAME}" //'main'
        //     }
        // }
        stage('Smoke Tests') {
            when {
                anyOf {
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                build job: 'PIPELINE_CYPRESS'
            }
        }
        stage('Deploy') {
            when {
                anyOf {
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                script {
                    echo "Deploying..."
                    def frontendResponse = httpRequest(
                        url: "${RENDER_FE_DEPLOY_HOOK}",
                        httpMode: 'POST',
                        validResponseCodes: '200:299'
                    )
                    echo "Response: ${frontendResponse}"
                }
            }
        }
    }

    post {
        success {
            bat 'docker-compose down'
            echo 'Build was successful!'
        }
        failure {
            echo 'Build failed. Check logs.'
        }
    }
}
