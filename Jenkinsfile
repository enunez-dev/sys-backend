pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
        PM2_HOME = 'C:\\tools\\.pm2'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/enunez-dev/sys-backend.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Install PM2') {
            steps {
                bat 'npm install -g pm2'
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Deploy with PM2') {
            steps {
                script {
                    try {
                        // Detén cualquier instancia anterior de la aplicación
                        bat 'pm2 stop sys-backend || echo "No previous app instance running"'
                        // Elimina la aplicación de la lista de PM2
                        bat 'pm2 delete sys-backend || echo "No previous app instance to delete"'
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }
                    // Inicia la aplicación con PM2 en segundo plano
                    bat 'pm2 start dist/index.js --name "sys-backend" -- -p %PORT%'
                    // Guarda la lista de procesos de PM2 para recuperación automática
                    bat 'pm2 save'
                }
            }
        }
        stage('Check PM2 Logs') {
            steps {
                script {
                    bat 'pm2 logs sys-backend --lines 100'
                }
            }
        }
        stage('Verify Application') {
            steps {
                script {
                    def output = bat(script: 'netstat -an | findstr %PORT%', returnStdout: true).trim()
                    if (!output.contains('LISTENING')) {
                        error "La aplicación no está corriendo en el puerto %PORT%"
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with PM2.'
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
