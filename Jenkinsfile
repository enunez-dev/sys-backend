pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        // separator(name:'BUILD_CONFIGURATION', sectionHeader: 'BUILD CONFIGURATION');
        // string(name:'NGINX_BACKEND_PATH', defaultValue:'C:\\nginx\\html\\sys-backend', description:'Path NGINX');
        // string(name:'NGINX_BACKEND_JENKINS', defaultValue:'C:\\data\\jenkins_home\\workspace\\sys-backend', description:'Path JENKINS');

        // separator(name:'NGINX_CONFIGURATION', sectionHeader: 'NGINX CONFIGURATION');
        // string(name:'CONFIG', defaultValue:'C:\\nginx\\conf\\nginx-backend.conf', description:'Path of nginx-backend.conf');

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
        stage('Iniciar aplicación Node.js') {
            steps {
                // Ejecuta la aplicación Node.js en segundo plano
                bat "start /B node src\\app.js"
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
