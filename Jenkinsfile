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
        stage('Down Service Nginx') {
            steps {
                script {
                    String nginxPathExecutable = "C:\\nginx\\nginx.exe"
                    bat "\"${nginxPathExecutable}\" -v"
                    
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx esta corriendo, se bajara el servicio para actualizar app.'
                        bat "\"${nginxPathExecutable}\" -p C:\\nginx\\ -s stop"
                        sleep 2
                    } else {
                        echo 'Nginx no esta corriendo, se procede a actualizar la app.'
                    }
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

        stage('Up server nginx') {
            steps {
                script{
                    withEnv ( ['JENKINS_NODE_COOKIE=do_not_kill'] ) {
                        String nginxPathExecutable = "C:\\nginx\\nginx.exe"
                        bat "start /B cmd /c \"${nginxPathExecutable}\" -p C:\\nginx\\"
                        echo 'Nginx corriendo, se sube el servicio.'
                        sleep 2
                    }
                }
            }
        }
        stage('Start Backend') {
            steps {
                script {
                    // Cambiar al directorio de Nginx y ejecutar el backend
                    bat "cd ${env.NGINX_BACKEND_PATH} && start \"\" \"cmd /c node dist/index.js\""
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
