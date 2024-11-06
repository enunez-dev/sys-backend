pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:"DB_CONFIGURATION", sectionHeader:"DB CONFIGURATION")
        string(name: 'DB_HOST', defaultValue: 'localhost', description: 'Host')
        string(name: 'DB_PORT', defaultValue: '5432', description: 'Port')
        string(name: 'DB_DATABASE', defaultValue: 'dbpos', description: 'Database')
        string(name: 'DB_USER', defaultValue: 'postgres', description: 'User')
        string(name: 'DB_PASSWORD', defaultValue: 'Password123', description: 'Password')

        separator(name:"PM2", sectionHeader:"PM2 CONFIGURATION")
        booleanParam(name: 'PM2_INSTALL', defaultValue: false, description: 'Pm2 install dependecies')

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
        stage('Compile TypeScript') {
            steps {
                bat "npm run build -- --outDir ${env.BUILD_PATH}"
                // bat "npm run build"
            }
        }

        // stage('Install pm2') {
        //     when {
        //         expression { params.PM2_INSTALL }
        //     }
        //     steps {
        //         bat 'npm install -g pm2'
        //     }
        // }

        stage('Get NPM Prefix') {
            steps {
                script {
                    // Ejecutar el comando y capturar la salida
                    def npmPrefix = bat(script: 'npm config get prefix', returnStdout: true).trim().split('\n')[1]
                    echo "La ruta de instalación global es: ${npmPrefix}"
                    
                    // Definir la ruta de PM2
                    env.PM2_PATH = "${npmPrefix}\\pm2"
                    echo "La ruta de instalación de pm2 es: ${env.PM2_PATH}"
                }
            }
        }
        stage('Check PM2 Installation') {
            steps {
                bat '''
                IF EXIST "%PM2_PATH%" (
                    echo PM2 está instalado en la ruta especificada.
                ) ELSE (
                    echo PM2 no está instalado. Instalando...
                    npm install -g pm2
                )
                '''
            }
        }

        // stage('Copy node_modules') {
        //     when {
        //         expression { params.RUN_INSTALL }
        //     }
        //     steps {
        //         bat '''
        //         IF EXIST "node_modules" (
        //             xcopy /E /I node_modules "%BUILD_PATH%\\node_modules"
        //         )
        //         '''
        //     }
        // }

        stage('Run Test') {
            when {
                expression { params.RUN_TESTS }
            }
            steps {
                bat 'npm run test'
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
        stage('Process stop') {
            steps {
                bat "\"${env.PM2_PATH}\" stop all"
                // bat 'pm2 stop all'
            }
        }
        stage('Run nodejs') {
            steps {
                script {
                    dir('C:\\data\\jenkins_home\\workspace\\sys-backend\\dist') {
                        // bat 'pm2 start index.js'
                        bat "\"${env.PM2_PATH}\" start index.js"
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
