pipeline {
    agent any

    // environment {
    //     RENDER_API_KEY = credentials('render-api-key')
    //     RENDER_FE_DEPLOY_HOOK = credentials('render-todolist-frontend')
    // }

    stages {
        stage('Build') {
            steps {
                echo 'Building containers...'
                // bat 'npm install'
                // bat 'docker-compose up -d --build'
            }
        }
        // stage('Unit Tests') {
        //     steps {
        //         echo 'Running unit tests...'
        //     }
        // }
        // stage('Component Tests') {
        //     steps {
        //         echo 'Running component tests...'
        //     }
        // }
        // stage('Debug Branch') {
        //     steps {
        //         echo "Current branch: ${env.GIT_BRANCH}"
        //         echo "Current branch: ${env.BRANCH_NAME}" //'main'
        //     }
        // }
        // stage('Smoke Tests E2E') {
        //     when {
        //         anyOf {
        //             expression { env.GIT_BRANCH == 'origin/main' }
        //         }
        //     }
        //     steps {
        //         build job: 'PIPELINE_CYPRESS'
        //     }
        // }
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Define a variável scannerHome com o caminho da instalação do Sonar Scanner
                    def scannerHome = tool 'sonar-scanner' // Nome cadastrado em "Global Tool Configuration"
                    echo "Using Sonar Scanner from: ${scannerHome}"
                    // Usa as variáveis de ambiente do Sonar (como o token e a URL)
                    withSonarQubeEnv('sonar-server') { // Troque pelo nome configurado no Jenkins
                        // Executa o scanner (no Windows, com bat)
                        bat "${scannerHome}\\bin\\sonar-scanner -Dsonar.projectKey=todolist-frontend"
                        // bat ''' sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.token=sqa_4e6ae113e6468116e467284afb68eaf616d0ae1e -Dsonar.projectKey=todolist-frontend '''
                    }
                }
            }
        }
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

    // post {
    //     success {
    //         bat 'docker-compose down'
    //         echo 'Build was successful!'
    //     }
    //     failure {
    //         echo 'Build failed. Check logs.'
    //     }
    // }
}
