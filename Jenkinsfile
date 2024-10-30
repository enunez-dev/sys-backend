pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:'BUILD_CONFIGURATION', sectionHeader: 'BUILD CONFIGURATION');
        string(name:'NGINX_BACKEND_PATH', defaultValue:'C:\\nginx\\html\\sys-backend', description:'Path NGINX');
        string(name:'NGINX_BACKEND_JENKINS', defaultValue:'C:\\data\\jenkins_home\\workspace\\sys-backend', description:'Path JENKINS');

        separator(name:'NGINX_CONFIGURATION', sectionHeader: 'NGINX CONFIGURATION');
        string(name:'CONFIG', defaultValue:'C:\\nginx\\conf\\nginx-backend.conf', description:'Path of nginx-backend.conf');

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
        stage('Copy Build to Nginx Directory') {
            steps {
                script {
                    // Crear el directorio de destino en Nginx si no existe
                    bat "mkdir ${NGINX_BACKEND_PATH}"
                    // Copiar la carpeta dist generada al directorio de Nginx
                    bat "xcopy /E /I ${NGINX_BACKEND_JENKINS}\\dist ${NGINX_BACKEND_PATH}\\dist"
                }
            }
        }
        stage('Deploy with PM2') {
            steps {
                script {
                    try {
                        // Detener cualquier instancia anterior
                        bat "\"${env.PM2_PATH}\" stop sys-backend || echo \"No previous app instance running\""
                        bat "\"${env.PM2_PATH}\" delete sys-backend || echo \"No previous app instance to delete\""
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }
                    // Iniciar la aplicación con PM2 en segundo plano
                    bat "\"${env.PM2_PATH}\" start dist/index.js --name \"sys-backend\" -- -p %PORT%"
                    // Guardar la lista de procesos de PM2
                    bat "\"${env.PM2_PATH}\" save"
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
