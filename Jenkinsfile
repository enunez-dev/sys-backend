pipeline {
    agent any

    environment {
        FRONTEND_PORT = '3000'
        BACKEND_PORT = '3050'
        VITE_BASE_URL = "http://localhost:${BACKEND_PORT}/api"
        NGINX_PATH = 'F:\\nginx\\nginx.exe'
        WORKSPACE_BACKEND_PATH = "F:\\nginx\\services" // Directory for backend distribution
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
    }

    parameters {
        string(name: 'GITHUB_URL', defaultValue: 'https://github.com/enunez-dev/sys-backend.git', description: 'GitHub URL project')
        string(name: 'GITHUB_BRANCH', defaultValue: 'master', description: 'Branch to deploy from')
    }

    stages {
        stage('Checkout') {
            steps {
                git(branch: "${GITHUB_BRANCH}", url: "${GITHUB_URL}")
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Stop Nginx') {
            steps {
                script {
                    // Check if Nginx is running, then stop it if it is
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx is running; stopping the service for app update.'
                        bat "\"${env.NGINX_PATH}\" -p F:\\nginx\\ -s stop"
                        sleep 2
                    } else {
                        echo 'Nginx is not running; proceeding with app update.'
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Copy Backend to Server') {
            steps {
                script {
                    def workspacePath = "${env.WORKSPACE}\\dist"
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${env.WORKSPACE_BACKEND_PATH}\""                }
            }
        }

        stage('Start Nginx') {
            steps {
                script {
                        withEnv(['JENKINS_NODE_COOKIE=do_not_kill']) {
                        bat "start /B cmd /c \"${env.NGINX_PATH}\" -p F:\\nginx\\"
                        echo 'Nginx is now running after app update.'
                        sleep 2
                    }                
                }
            }
        }

    }

    post {
        always {
            echo 'Backend deployment completed.'
        }
        failure {
            echo 'Deployment failed. Check logs for details.'
        }
    }
}
