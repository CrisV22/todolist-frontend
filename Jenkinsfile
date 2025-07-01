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
                bat 'dir'
                bat 'npm install'
                bat '''
                powershell -Command "Start-Process 'npm.cmd' -ArgumentList 'run', 'dev' -WindowStyle Hidden"
                '''
                // bat 'npm install -g serve'
                // bat 'npm run build'
                // bat '''powershell -Command "Start-Process 'serve.cmd' -ArgumentList '-s', 'dist' -WindowStyle Hidden"'''
            }
        }
        stage('Test') {
            steps {
                echo 'Testing..'
                // dir('cypress') {
                //     bat 'npm install'
                //     bat 'npx cypress run'
                // }
                bat '''
                    cd cypress
                    npm install
                    npx cypress run
                '''
            }
        }
        // stage('Debug Branch') {
        //     steps {
        //         echo "Current branch: ${env.GIT_BRANCH}"
        //         echo "Current branch: ${env.BRANCH_NAME}" //'main'
        //     }
        // }
        // stage('Deploy') {
        //     when {
        //         anyOf {
        //             expression { env.GIT_BRANCH == 'origin/main' }
        //         }
        //     }
        //     steps {
        //         script {
        //             echo "Deploying..."
        //             def frontendResponse = httpRequest(
        //                 url: "${RENDER_FE_DEPLOY_HOOK}",
        //                 httpMode: 'POST',
        //                 validResponseCodes: '200:299'
        //             )
        //             echo "Response: ${frontendResponse}"
        //         }
        //     }
        // }
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
