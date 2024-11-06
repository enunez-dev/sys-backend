pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:"NGINX_CONFIGURATION", sectionHeader:"NGINX CONFIGURATION")
        string(name: 'NGINX_EXECUTABLE_PATH', defaultValue: 'C:\\nginx\\nginx.exe', description: 'Set the path to Nginx executable')
        string(name: 'NGINX_BASE_PATH', defaultValue: 'C:\\nginx\\', description: 'Set the path to Nginx base')
        string(name: 'SERVICES_PATH', defaultValue: 'C:\\nginx\\html\\services', description: 'Set destination for frontend files')

        separator(name:"DB_CONFIGURATION", sectionHeader:"DB CONFIGURATION")
        string(name: 'DB_HOST', defaultValue: 'localhost', description: 'Host')
        string(name: 'DB_PORT', defaultValue: '5432', description: 'Port')
        string(name: 'DB_DATABASE', defaultValue: 'dbpos', description: 'Database')
        string(name: 'DB_USER', defaultValue: 'postgres', description: 'User')
        password(name: 'DB_PASSWORD', defaultValue: 'Password123', description: 'Password')

        separator(name:"PUBLISH_CONFIGURATION", sectionHeader:"PUBLISH CONFIGURATION")    
        booleanParam(name: 'RUN_INSTALL', defaultValue: false, description: 'Check to run install dependecies')
        booleanParam(name: 'RUN_TESTS', defaultValue: false, description: 'Check to run tests')
        string(name: 'OUTPUT_FOLDER', defaultValue: 'OutputBuilds', description: 'Folder contain output build app')
        choice(name: 'ENVIRONMENT', choices: ['Development','Testing','Staging','Production'], description: 'Target environment')

    }

    environment {
        BUILD_PATH = "${params.OUTPUT_FOLDER}" + "\\" + "${BUILD_NUMBER}" + "\\" + "${params.ENVIRONMENT}"
        DB_HOST = "${params.DB_HOST}"
        DB_PORT = "${params.DB_PORT}"
        DB_DATABASE = "${params.DB_DATABASE}"
        DB_USER = "${params.DB_USER}"
        DB_PASSWORD = "${params.DB_PASSWORD}"
    }

    stages {
        stage('Checkout') {
            steps {
                git(branch: "${GITHUB_BRANCH}", url: "${GITHUB_URL}")
            }
        }
        
        stage('Compile TypeScript') {
            steps {
                bat "npm run build -- --outDir ${env.BUILD_PATH}"
            }
        }

        stage('Install Dependencies') {
            when {
                expression { params.RUN_INSTALL }
            }
            steps {
                // Eliminar la carpeta node_modules si existe
                bat '''
                IF EXIST "node_modules" (
                    echo Eliminando la carpeta node_modules...
                    rmdir /s /q node_modules
                )
                '''

                echo "Instalando dependencias..."
                bat 'npm install'
            }
        }

        stage('Copy node_modules') {
            steps {
                bat '''
                IF EXIST "node_modules" (
                    xcopy /E /I node_modules "%BUILD_PATH%\\node_modules"
                )
                '''
            }
        }

        stage('Run Test') {
            when {
                expression { params.RUN_TESTS }
            }
            steps {
                bat 'npm run test'
            }
        }

        stage('Down Service Nginx') {
            steps {
                script {
                    // Check if Nginx is running, then stop it if it is
                    def isRunning = bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true) == 0
                    if (isRunning) {
                        echo 'Nginx is running; stopping the service for app update.'
                        bat "\"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH} -s stop"
                    } else {
                        echo 'Nginx is not running; proceeding with app update.'
                    }
                }
            }
        }
        stage('Publish build to server') {
            steps {
                script {
                    def workspacePath = "${env.WORKSPACE}\\${env.BUILD_PATH}"
                    bat "xcopy /E /I /Y \"${workspacePath}\" \"${params.SERVICES_PATH}\""
                }
            }
        }
        stage('Push artifacts') {
            steps {
                script {
                    def timestamp = new java.text.SimpleDateFormat("yyyyMMddhhmmss")
                    String today = timestamp.format(new Date())
                    String filesPath = "${params.OUTPUT_FOLDER}" + "\\" + "${BUILD_NUMBER}"
                    String outputPath = "${env.BUILD_PATH}" + "\\"+today+"_" + "${BUILD_NUMBER}" + "_outputFiles.zip"
                    
                    zip zipFile: outputPath, archive:false, dir:filesPath
                    archiveArtifacts artifacts:outputPath, caseSensitive: false
                }
            }
        }

        stage('Up server nginx') {
            steps {
                script {
                    withEnv(['JENKINS_NODE_COOKIE=do_not_kill']) {
                        bat "start /B cmd /c \"${params.NGINX_EXECUTABLE_PATH}\" -p ${params.NGINX_BASE_PATH}"
                        echo 'Nginx is now running after app update.'
                        bat(script: 'tasklist | findstr /I nginx.exe', returnStatus: true)
                    }
                }
            }
        }

        stage('Run nodejs') {
            steps {
                script {
                    bat "cd \"${params.SERVICES_PATH}\" && start /B node index.js"
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
