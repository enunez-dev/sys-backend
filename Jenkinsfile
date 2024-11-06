pipeline {
    agent any

    parameters {
        separator(name:'GITHUB_CONFIGURATION', sectionHeader: 'GITHUB CONFIGURATION');
        string(name:'GITHUB_BRANCH', defaultValue:'deploy-nginx-edward', description:'GitHub Branch Name');
        string(name:'GITHUB_URL', defaultValue:'https://github.com/enunez-dev/sys-backend.git', description:'GitHub URL project');

        separator(name:'DEPENDENCES', sectionHeader: 'DEPENDENCES');
        choice(name:'NPM_INSTALL', choices:['NOT', 'YES'], description:'npm install?');

    }

    stages {
        stage('Checkout') {
            steps {
                git(branch: "${GITHUB_BRANCH}", url: "${GITHUB_URL}")
            }
        }
        
        stage('Install Dependencies') {
            steps {
                script {
                    if (params.NPM_INSTALL == "YES") {
                        bat 'npm install'
                    } else {
                        echo 'No hay dependencias nuevas...'
                    }
                }
                
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npm run build'
            }
        }
        stage('Run nodejs') {
            steps {
                script {
                    // Inicia el proceso en segundo plano y obtiene el ID del proceso para controlarlo
                    powershell '''
                        # Inicia el proceso de Node.js en segundo plano y redirige la salida a un archivo
                        $process = Start-Process -NoNewWindow -FilePath "cmd.exe" -ArgumentList "/c npm run start" -PassThru -RedirectStandardOutput "output.log" -RedirectStandardError "error.log"
                        
                        # Espera 10 segundos para permitir que el proceso inicie correctamente
                        Start-Sleep -Seconds 10
                        
                        # Verifica si el proceso sigue en ejecución
                        if ($process.HasExited) {
                            Write-Output "El proceso terminó inesperadamente. Verifica output.log y error.log para más detalles."
                            Exit 1
                        } else {
                            Write-Output "El proceso Node.js está corriendo en segundo plano."
                        }
                    '''
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
