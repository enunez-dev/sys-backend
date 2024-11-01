pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${GITHUB_URL}", branch: "${GITHUB_BRANCH}"
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Run Integration Test') {
            steps {
                script {
                    bat 'npm test'
                }
            }
        }
        stage('Run nodejs') {
            steps {
                script {
                    // Ejecuta npm run start como un proceso en segundo plano
                    powershell 'Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run start" -RedirectStandardOutput "output.log" -RedirectStandardError "output.log"'
                }
            }
        }

    }
    post {
        always {
            echo 'Proceso de despliegue del sys-backend completado.'
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
