pipeline {
    agent any

    environment {
        RENDER_API_KEY = credentials('render-api-key')
        RENDER_FE_DEPLOY_HOOK = credentials('render-todolist-frontend')
        SONAR_PROJECT_KEY = "todolist-frontend"
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building containers...'
                bat 'npm install'
                bat 'docker-compose up -d'
            }
        }
        stage('Unit Tests') {
            steps {
                echo 'Running unit tests...'
            }
        }
        stage('Component Tests') {
            steps {
                echo 'Running component tests...'
            }
        }
        // stage('Debug Branch') {
        //     steps {
        //         echo "Current branch: ${env.GIT_BRANCH}"
        //         echo "Current branch: ${env.BRANCH_NAME}" //'main'
        //     }
        // }
        stage('Smoke Tests E2E') {
            when {
                anyOf {
                    expression { env.GIT_BRANCH == 'origin/main' }
                }
            }
            steps {
                build job: 'PIPELINE_CYPRESS'
            }
        }
        // stage('SonarQube') {
        //     steps {
        //         script {
        //             def scannerHome = tool 'sonar-scanner'
        //             echo "Using Sonar Scanner from: ${scannerHome}"
        //             withSonarQubeEnv('sonar-server') {
        //                 echo "Running SonarQube analysis for project: ${SONAR_PROJECT_KEY}"
        //                 bat "${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY}"
        //             }
        //         }
        //     }
        // }
        // stage('Quality Gate') {
        //     steps {
        //         script {
        //             timeout(time: 5, unit: 'MINUTES') {
        //                 def qualityGate = waitForQualityGate()
        //                 if (qualityGate.status != 'OK') {
        //                     error "SonarQube Quality Gate failed: ${qualityGate.status}"
        //                 } else {
        //                     echo "SonarQube analysis passed."
        //                 }
        //             }
        //         }
        //     }
        // }
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
            echo 'Pipeline failed. Check logs.'
        }
    }
}
