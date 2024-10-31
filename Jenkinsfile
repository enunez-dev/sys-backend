pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:'PM2_CONFIG', sectionHeader: 'PM2 CONFIG');
        string(name:'PM2_HOME', defaultValue:'C:\\tools\\.pm2', description:'Path pm2');

        separator(name:'DATABASE', sectionHeader: 'DATABASE CONFIGURATION');
        string(name:'CONNECTION_STRING', defaultValue:'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres');

    }

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
        PM2_HOME = 'C:\\tools\\.pm2'
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
        stage('Find PM2 Path') {
            steps {
                script {
                    // Capturar el nombre de usuario actual usando PowerShell
                    def loggedUser = bat(script: 'powershell -Command "(Get-WmiObject -Class Win32_ComputerSystem).UserName.Split(\'\\\\\')[1]"', returnStdout: true).trim()
                    loggedUser = loggedUser.split("\r\n")[-1].trim()
                    echo "loggedUser: ${loggedUser}"
                    // Intentar encontrar pm2 en una ruta común de instalación global
                    def possiblePm2Paths = [
                        "C:\\Users\\${loggedUser}\\AppData\\Roaming\\npm\\pm2.cmd",
                        "C:\\Program Files\\nodejs\\pm2.cmd",
                    ]
                    echo "possiblePm2Paths: ${possiblePm2Paths}"
                    def foundPm2Path = possiblePm2Paths.find { path ->
                        fileExists(path)
                    }

                    if (foundPm2Path) {
                        env.PM2_PATH = foundPm2Path
                        echo "PM2 se encuentra en: ${env.PM2_PATH}"
                    } else {
                        error "No se pudo encontrar la ruta de PM2 en las ubicaciones conocidas"
                    }
                }
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