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
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                bat 'dir'
                dir('frontend\\cypress') {
                    bat 'dir'
                    bat 'npm install'
                    bat 'npx cypress run'
                }
            }
        }
        // stage('Debug Branch') {
        //     steps {
        //         echo "Current branch: ${env.GIT_BRANCH}"
        //         echo "Current branch: ${env.BRANCH_NAME}" //'main'
        //     }
        // }
        stage('Deploy') {
            when {
                anyOf {
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                echo 'Deploying to production...'
                // coloque o código de deploy aqui
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
